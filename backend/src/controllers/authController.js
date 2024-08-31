import MemberModel from '../models/memberModel.js';

class AuthController {
	static async registerMember(req, res) {
		const { email, password, nickname } = req.body;
		// check required fields
		if ([email, password, nickname].includes('')) {
			res.status(400);
			return;
		}
		// check if email is already taken
		if ((await MemberModel.findMemberByEmail(email)) !== null) {
			res
				.status(400)
				.json({ error: '해당 이메일로 가입된 계정이 이미 존재합니다.' });
			return;
		}

		const result = await MemberModel.createMember({
			email,
			password,
			nickname,
		});
		res.status(201).json({ message: '회원가입 되었습니다.' });
	}
}

export default AuthController;
