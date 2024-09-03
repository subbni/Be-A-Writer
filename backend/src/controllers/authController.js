import MemberModel from '../models/memberModel.js';
import AuthService from '../services/authService.js';

class AuthController {
	static async registerMember(req, res) {
		const { email, password, nickname } = req.body;
		// check required fields
		if ([email, password, nickname].includes('')) {
			res.status(400);
			return;
		}
		try {
			const data = await AuthService.registerMember({
				email,
				password,
				nickname,
			});
			data.message = '회원가입 되었습니다.';
			res.status(201).json(data);
		} catch (e) {
			res.status(400).json({ message: e.message });
		}
	}

	static async login(req, res) {
		const { email, password } = req.body;
		// check required fields
		if ([email, password].includes('')) {
			res.status(400);
			return;
		}
		try {
			const data = await AuthService.login({ email, password });
			data.message = '로그인 되었습니다.';
			res.status(201).json(data);
		} catch (e) {
			res.status(400).json({ message: e.message });
		}
	}
}

export default AuthController;
