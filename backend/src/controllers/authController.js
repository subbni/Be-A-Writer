import MemberModel from '../models/memberModel.js';
import AuthService from '../services/authService.js';

class AuthController {
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
			const token = AuthService.generateToken(data);
			res.cookie('access_token', token, {
				maxAge: 1000 * 60 * 60 * 24 * 7,
				httpOnly: true,
			});
			data.message = '로그인 되었습니다.';
			return res.status(201).json(data);
		} catch (e) {
			return res.status(400).json({ message: e.message });
		}
	}

	static async check(req, res) {
		const { member } = req.state;
		if (!member) {
			return res.status(401).end(); // UNAUTHORIZED
		}
		return res.json(member);
	}

	static async logout(req, res) {
		res.clearCookie('access_token', req.cookies.access_token, {
			httpOnly: true,
		});
		res.status(204).end(); // NO_CONTENT
	}
}

export default AuthController;
