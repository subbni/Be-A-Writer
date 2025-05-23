import AuthProvider from '../constants/authProvider.js';
import AuthService from '../services/authService.js';
import * as tokenUtil from '../utils/tokenUtil.js';
import { areAllFieldsDefined } from '../utils/helpers.js';

class AuthController {
	/**
	 * 회원가입
	 * POST /api/auth/register
	 */
	static async registerMember(req, res) {
		const { email, password, nickname } = req.body;
		// check required fields
		if (!email || !password || !nickname) {
			res.status(400);
			return;
		}
		try {
			const data = await AuthService.registerMember({
				email,
				password,
				nickname,
				authProvider: AuthProvider.LOCAL,
			});
			data.message = '회원가입 되었습니다.';
			return res.status(201).json(data);
		} catch (e) {
			return res.status(400).json({ message: e.message });
		}
	}

	/**
	 * 로그인
	 * POST /api/auth/login
	 */
	static async login(req, res) {
		const { email, password } = req.body;
		// check required fields
		if (!email || !password) {
			return res
				.status(400)
				.json({ message: 'email and password are required' });
		}
		try {
			const data = await AuthService.login({ email, password });
			const token = tokenUtil.generateToken(data);
			tokenUtil.setTokenCookie(res, token);
			data.message = '로그인 되었습니다.';
			return res.status(201).json(data);
		} catch (e) {
			return res.status(400).json({ message: e.message });
		}
	}

	/**
	 * 로그인 검증 : 쿠키 설정
	 * GET /api/auth/check
	 */
	static async check(req, res) {
		const { member } = req.state;
		if (!member) {
			return res.status(401).end(); // UNAUTHORIZED
		}
		return res.json(member);
	}

	/**
	 * 로그아웃 : 쿠키 무효화
	 * POST /api/auth/logout
	 */
	static async logout(req, res) {
		tokenUtil.clearTokenCookie(req, res);
		res.status(204).end(); // NO_CONTENT
	}

	/**
	 * 비밀번호 변경
	 */
	/**
	 * patch /api/auth/password
	 * { currentPassword, newPassword }
	 */
	static async updatePassword(req, res) {
		const { currentPassword, newPassword } = req.body;
		if (!areAllFieldsDefined({ currentPassword, newPassword })) {
			return res.status(400).json({
				message: 'currentPassword and newPassword fields are required',
			});
		}
		const memberId = req.state.member.member_id;
		try {
			const data = await AuthService.updatePassword({
				currentPassword,
				newPassword,
				memberId,
			});
			return res.status(200).json(data);
		} catch (e) {
			console.log(e);
			return res.status(e.status).json({ message: e.message });
		}
	}
}

export default AuthController;
