import AuthErrorMessage from '../constants/error/authErrorMessage.js';
import MemberModel from '../models/memberModel.js';
import jwt from 'jsonwebtoken';

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
			member_id: member.member_id,
			email: member.email,
			nickname: member.nickname,
		};
	}

	static generateToken({ member_id, nickname }) {
		const token = jwt.sign(
			{
				member_id: member_id,
				nickname: nickname,
			},
			process.env.JWT_SECRET,
			{
				expiresIn: '7d',
			},
		);
		return token;
	}
}

export default AuthService;
