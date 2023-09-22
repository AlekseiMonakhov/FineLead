import { AuthRepository } from '../repositories/authRepository';
import httpStatus from 'http-status';
import { Request, Response } from 'express';

export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  async signUp(username: string, email: string, password: string) {
    try {
      const result = await this.authRepository.signUp(username, email, password);

      if (result.status === httpStatus.CONFLICT) {
        return { status: httpStatus.CONFLICT };
      }

      return { status: httpStatus.CREATED, message: 'New user created' };
    } catch (err) {
      return { status: httpStatus.INTERNAL_SERVER_ERROR };
    }
  }

  async login(email: string, password: string, cookies: Record<string, string>) {
    try {
      const result = await this.authRepository.login(email, password, cookies);

      if (result.status === httpStatus.UNAUTHORIZED) {
        return { status: httpStatus.UNAUTHORIZED };
      }

      if (result.status === httpStatus.OK && result.accessToken) {
        return { status: httpStatus.OK, accessToken: result.accessToken };
      }

      return { status: httpStatus.INTERNAL_SERVER_ERROR };
    } catch (err) {
      return { status: httpStatus.INTERNAL_SERVER_ERROR };
    }
  }

  async logout(cookies: Record<string, string>) {
    try {
      const result = await this.authRepository.logout(cookies);
      return { status: result.status };
    } catch (err) {
      return { status: httpStatus.INTERNAL_SERVER_ERROR };
    }
  }

  async refresh(req: Request, res: Response) {
    try {
      const result = await this.authRepository.refresh(req, res);

      if (result.status === httpStatus.UNAUTHORIZED) {
        return { status: httpStatus.UNAUTHORIZED };
      }

      if (result.status === httpStatus.OK && result.accessToken) {
        return { status: httpStatus.OK, accessToken: result.accessToken };
      }

      return { status: httpStatus.INTERNAL_SERVER_ERROR };
    } catch (err) {
      return { status: httpStatus.INTERNAL_SERVER_ERROR };
    }
  }
}
