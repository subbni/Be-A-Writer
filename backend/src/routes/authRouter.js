import { Router } from 'express';
import AuthController from '../controllers/authController.js';
import checkLoggedIn from '../lib/checkLoggedIn.js';

const authRouter = Router();

authRouter.post('/register', AuthController.registerMember);
authRouter.post('/login', AuthController.login);
authRouter.get('/check', AuthController.check);
authRouter.post('/logout', AuthController.logout);
authRouter.patch('/password', checkLoggedIn, AuthController.updatePassword);

export default authRouter;
