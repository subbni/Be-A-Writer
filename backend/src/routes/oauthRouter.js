import { Router } from 'express';
import OAuthController from '../controllers/oauthController.js';

const oauthRouter = Router();

// TODO : OAuth2 middleware 작성 -> code 바탕으로 access_token 얻기 -> userInfo 얻어오기 -> 각 provider에 대응하여 정보 가공 ->  controller에 userInfo만 넘겨주기
oauthRouter.get('/callback/:provider', OAuthController.socialLogin);

export default oauthRouter;
