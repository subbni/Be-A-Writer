import AuthErrorMessage from '../constants/error/authErrorMessage.js';
import OAuthService from '../services/oauthService.js';
import * as tokenUtil from '../utils/tokenUtil.js';

class OAuthController {
	/**
	 * 리디렉션 from Provider
	 * GET /api/oauth/callback/:provider?code=
	 */
	static async socialLogin(req, res, next) {
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
			console.error('Social login error:', e.message, 'User info:', userInfo);
			// error handler에 역할 위임
			return next(e);
		}
	}

	/**
	 * GET /api/oauth/userinfo
	 */
	static async getUserInfoFromCookie(req, res) {
		const userInfo = req.cookies.userInfo;

		if (!userInfo) {
			return res.status(400).json({ message: '사용자 정보가 없습니다.' });
		}

		return res.status(200).json({ userInfo: JSON.parse(userInfo) });
	}
	/**
	 * POST /api/oauth/register
	 */

	static async register(req, res) {
		const { email, nickname, authProvider } = req.body;
		if (!email || !nickname || !authProvider) {
			return res.status(404).json({ message: '필수 정보가 부족합니다.' });
		}
		try {
			const data = await OAuthService.registerMember({
				email,
				nickname,
				password: '',
				authProvider,
			});
			const token = tokenUtil.generateToken(data);
			tokenUtil.setTokenCookie(res, token);
			data.message = '회원가입 되었습니다.';
			return res.status(201).json(data);
		} catch (e) {
			console.log(e);
			return res.status(e.status).json({ message: e.message });
		}
	}
}

export default OAuthController;
