import { Router } from 'express';
import OAuthController from '../controllers/oauthController.js';
import oauth2Middleware from '../lib/oauth2/oauth2Middleware.js';
import oauth2ErrorHandler from '../lib/oauth2ErrorHandler.js';

const oauthRouter = Router();

oauthRouter.get(
	'/callback/:provider',
	oauth2Middleware,
	OAuthController.socialLogin,
	oauth2ErrorHandler,
);
oauthRouter.get('/userinfo', OAuthController.getUserInfoFromCookie);
oauthRouter.post('/register', OAuthController.register);
export default oauthRouter;
