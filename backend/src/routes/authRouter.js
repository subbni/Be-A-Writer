import { Router } from 'express';
import AuthController from '../controllers/authController.js';

const authRouter = Router();

authRouter.post('/register', AuthController.registerMember);
authRouter.post('/login', AuthController.login);
authRouter.get('/check', AuthController.check);
authRouter.post('/logout', AuthController.logout);

export default authRouter;
