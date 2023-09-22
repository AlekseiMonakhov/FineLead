import { Request, Response } from 'express';
import { AuthService } from '../../core/services/authService';
import { AuthRepositoryImpl } from '../repositories/authRepositoryImpl';
import pool from '../db/config/postgresConfig';
import httpStatus from 'http-status';

const authRepositoryImpl = new AuthRepositoryImpl(pool);

class AuthController {
    constructor(private authService: AuthService = new AuthService(authRepositoryImpl)) { }

    async signUp(req: Request, res: Response) {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(httpStatus.BAD_REQUEST).json({
                message: 'Username, email and password are required!'
            });
        }

        const result = await this.authService.signUp(username, email, password);

        return res.status(result.status).json(result);
    }

    async login(req: Request, res: Response) {
        const { email, password } = req.body;
        const cookies = req.cookies;

        if (!email || !password) {
            return res
                .status(httpStatus.BAD_REQUEST)
                .json({ message: 'Email and password are required!' });
        }

        const result = await this.authService.login(email, password, cookies);

        return res.status(result.status).json(result);
    }


    async logout(req: Request, res: Response) {
        const cookies = req.cookies;
        const result = await this.authService.logout(cookies);
        return res.status(result.status).json(result);
    }

    async refresh(req: Request, res: Response) {
        const result = await this.authService.refresh(req, res);
        return res.status(result.status).json(result);
    }
}


export default AuthController;
