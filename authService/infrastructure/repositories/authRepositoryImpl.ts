import httpStatus from 'http-status';
import * as argon2 from 'argon2';
import { Pool } from 'pg';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response } from 'express';
import {
  createAccessToken,
  createRefreshToken,
} from '../utils/generateTokens.util';
import config from '../config/config';
import { AuthRepository } from '../../core/repositories/authRepository';
import { clearRefreshTokenCookieConfig, refreshTokenCookieConfig } from '../config/cookieConfig';

export class AuthRepositoryImpl implements AuthRepository {
  constructor(private readonly pool: Pool) {}

  async signUp(username: string, email: string, password: string): Promise<{ status: number; message?: string }> {
    try {
      const client = await this.pool.connect();
      const checkUserEmailQuery = 'SELECT * FROM users.users WHERE email = $1';
      const checkUserEmailValues = [email];

      const { rowCount } = await client.query(checkUserEmailQuery, checkUserEmailValues);

      if (rowCount > 0) {
        client.release();
        return { status: httpStatus.CONFLICT };
      }

      const hashedPassword = await argon2.hash(password);

      const insertUserQuery = 'INSERT INTO users.users (username, email, hash_password) VALUES ($1, $2, $3) RETURNING user_id';
      const insertUserValues = [username, email, hashedPassword];

      const { rows } = await client.query(insertUserQuery, insertUserValues);
      const userId = rows[0].user_id;

      client.release();

      return { status: httpStatus.CREATED, message: 'New user created' };
    } catch (err) {
      return { status: httpStatus.INTERNAL_SERVER_ERROR };
    }
  }

  async login(email: string, password: string, cookies: Record<string, string>): Promise<{ status: number; accessToken?: string; message?: string }> {
    try {
      const client = await this.pool.connect();
      const findUserQuery = 'SELECT * FROM users.users WHERE email = $1';
      const findUserValues = [email];

      const { rowCount, rows } = await client.query(findUserQuery, findUserValues);

      if (rowCount === 0) {
        client.release();
        return { status: httpStatus.UNAUTHORIZED };
      }

      const user = rows[0];

      if (await argon2.verify(user.hash_password, password)) {
        client.release();

        const accessToken = createAccessToken(user.user_id);
        const refreshToken = createRefreshToken(user.user_id);

        const insertRefreshTokenQuery = 'INSERT INTO users.refresh_tokens (token, user_id) VALUES ($1, $2)';
        const insertRefreshTokenValues = [refreshToken, user.user_id];

        await client.query(insertRefreshTokenQuery, insertRefreshTokenValues);
        client.release();

        cookies[config.jwt.refresh_token.cookie_name] = refreshToken;

        return { status: httpStatus.OK, accessToken };
      } else {
        client.release();
        return { status: httpStatus.UNAUTHORIZED };
      }
    } catch (err) {
      return { status: httpStatus.INTERNAL_SERVER_ERROR };
    }
  }

  async logout(cookies: Record<string, string>): Promise<{ status: number; message?: string }> {
    const refreshToken = cookies[config.jwt.refresh_token.cookie_name];

    if (!refreshToken) {
      return { status: httpStatus.NO_CONTENT };
    }

    try {
      const client = await this.pool.connect();
      const deleteRefreshTokenQuery = 'DELETE FROM users.refresh_tokens WHERE token = $1';
      const deleteRefreshTokenValues = [refreshToken];

      await client.query(deleteRefreshTokenQuery, deleteRefreshTokenValues);
      client.release();

      return { status: httpStatus.NO_CONTENT };
    } catch (err) {
      return { status: httpStatus.INTERNAL_SERVER_ERROR };
    }
  }

  async refresh(req: Request, res: Response): Promise<{ status: number; accessToken?: string; message?: string }> {
    const refreshToken: string | undefined = req.cookies[config.jwt.refresh_token.cookie_name];

    if (!refreshToken) {
      return { status: httpStatus.UNAUTHORIZED };
    }

    res.clearCookie(config.jwt.refresh_token.cookie_name, clearRefreshTokenCookieConfig);

    try {
      const client = await this.pool.connect();
      const findRefreshTokenQuery = 'SELECT * FROM users.refresh_tokens WHERE token = $1';
      const findRefreshTokenValues = [refreshToken];

      const { rowCount, rows } = await client.query(findRefreshTokenQuery, findRefreshTokenValues);

      if (rowCount === 0) {
        return { status: httpStatus.FORBIDDEN };
      }

      await client.query('DELETE FROM users.refresh_tokens WHERE token = $1', [refreshToken]);
      client.release();

      const verifyResult = await argon2.verify(refreshToken, config.jwt.refresh_token.secret);

      if (verifyResult !== true) {
        return { status: httpStatus.FORBIDDEN };
      }

      const accessToken = createAccessToken(rows[0].user_id);
      const newRefreshToken = createRefreshToken(rows[0].user_id);

      try {
        const client = await this.pool.connect();
        const insertRefreshTokenQuery = 'INSERT INTO users.refresh_tokens (token, user_id) VALUES ($1, $2)';
        const insertRefreshTokenValues = [newRefreshToken, rows[0].user_id];

        await client.query(insertRefreshTokenQuery, insertRefreshTokenValues);
        client.release();

        res.cookie(
          config.jwt.refresh_token.cookie_name,
          newRefreshToken,
          refreshTokenCookieConfig
        );

        return { status: httpStatus.OK, accessToken };
      } catch (err) {
        return { status: httpStatus.INTERNAL_SERVER_ERROR };
      }
    } catch (err) {
      return { status: httpStatus.INTERNAL_SERVER_ERROR };
    }
  }
}
