import AuthErrorMessage from '../constants/error/authErrorMessage.js';
import MemberModel from '../models/memberModel.js';

class AuthService {
	static async registerMember({ email, password, nickname }) {
		// check if email is already taken
		if ((await MemberModel.findMemberByEmail(email)) !== null) {
			throw new Error(AuthErrorMessage.DUPLICATED_EMAIL);
		}

		await MemberModel.createMember({
			email,
			password,
			nickname,
		});

		return {
			email,
			nickname,
		};
	}

	static async login({ email, password }) {
		const member = await MemberModel.findMemberByEmail(email);
		if (member === null) {
			throw new Error(AuthErrorMessage.EMAIL_NOT_FOUND);
		}
		if (member.password !== password) {
			throw new Error(AuthErrorMessage.INVALID_PASSWORD);
		}
		return {
			email: member.email,
			nickname: member.nickname,
		};
	}
}

export default AuthService;
