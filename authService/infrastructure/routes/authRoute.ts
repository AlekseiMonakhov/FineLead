import express from 'express';
import { Router } from 'express';
import AuthController from '../controllers/authController';

const authRouter: Router = express.Router();
const authController = new AuthController();

authRouter.post('/sign-up', async (req, res) => {
  await authController.signUp(req, res);
});

authRouter.post('/login', async (req, res) => {
  await authController.login(req, res);
});

authRouter.post('/logout', async (req, res) => {
  await authController.logout(req, res);
});

authRouter.post('/refresh', async (req, res) => {
  await authController.refresh(req, res);
});

export default authRouter;
