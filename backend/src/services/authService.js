import AuthErrorMessage from '../constants/error/authErrorMessage.js';
import CustomError from '../constants/error/customError.js';
import MemberRepository from '../repositories/memberRepository.js';
import jwt from 'jsonwebtoken';

class AuthService {
	static async registerMember({ email, password, nickname, authProvider }) {
		// check if email is already taken
		if ((await MemberRepository.findByEmail(email)) !== null) {
			throw new CustomError(AuthErrorMessage.DUPLICATED_EMAIL);
		}

		await MemberRepository.create({
			email,
			password,
			nickname,
			authProvider,
		});

		return {
			email,
			nickname,
		};
	}

	static async login({ email, password }) {
		const member = await MemberRepository.findByEmail(email);
		if (member === null) {
			throw new CustomError(AuthErrorMessage.EMAIL_NOT_FOUND);
		}
		if (member.password !== password) {
			throw new CustomError(AuthErrorMessage.INVALID_PASSWORD);
		}
		return {
			member_id: member.member_id,
			email: member.email,
			nickname: member.nickname,
		};
	}
}

export default AuthService;
