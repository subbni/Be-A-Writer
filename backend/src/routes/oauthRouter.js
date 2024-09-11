import { Router } from 'express';
import OAuthController from '../controllers/oauthController.js';
import oauth2Middleware from '../lib/oauth2/oauth2Middleware.js';

const oauthRouter = Router();

oauthRouter.get(
	'/callback/:provider',
	oauth2Middleware,
	OAuthController.socialLogin,
);

export default oauthRouter;
