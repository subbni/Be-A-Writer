import { Router } from 'express';
import AuthController from '../controllers/authController.js';

const authRouter = Router();

// 회원가입
authRouter.post('/register', AuthController.registerMember);

export default authRouter;
