import { Request, Response } from 'express';

export interface AuthRepository {
  signUp(username: string, email: string, password: string): Promise<{ status: number; message?: string }>;
  login(email: string, password: string, cookies: Record<string, string>): Promise<{ status: number; accessToken?: string; message?: string }>;
  logout(cookies: Record<string, string>): Promise<{ status: number; message?: string }>;
  refresh(req: Request<Record<string, any>, any, any, Record<string, any>>, res: Response): Promise<{ status: number; accessToken?: string; message?: string }>;
}
