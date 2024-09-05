import OAuthService from '../services/oauthService.js';
import * as tokenUtil from '../utils/tokenUtil.js';

class OAuthController {
	/**
	 * 리디렉션 from Provider
	 * GET /api/oauth/callback/:provider?code=
	 */
	static async socialLogin(req, res) {
		const userInfo = req.userInfo;

		try {
			const data = await OAuthService.processSocialLogin(userInfo);
			// 성공적으로 소셜 로그인 완료
			// jwt 토큰 발급
			const token = tokenUtil.generateToken(data);
			tokenUtil.setTokenCookie(res, token);
			data.message = '로그인 되었습니다.';
			res.redirect(process.env.OAUTH_REDIRECT_URI);
		} catch (e) {
			// 소셜 로그인 실패
			res.redirect(
				`${process.env.OAUTH_REDIRECT_URI}?error=${encodeURIComponent(
					e.message,
				)}`,
			);
		}
	}
}

export default OAuthController;
