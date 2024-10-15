import axios from 'axios';
import AuthErrorMessage from '../constants/error/authErrorMessage.js';
import AuthService from './authService.js';
import MemberRepository from '../repositories/memberRepository.js';
import { mapAuthProvider } from '../constants/authProvider.js';
import CustomError from '../constants/error/customError.js';

class OAuthService {
	static async processSocialLogin(userInfo) {
		// login or register 처리

		//  1. 해당 이메일로 가입된 계정이 있는지 확인
		const member = await MemberRepository.findByEmail(userInfo.email);
		// 2. 있다면 현재 요청한 플랫폼과 동일한지 확인
		if (member !== null) {
			if (member.auth_provider === userInfo.authProvider) {
				// 2-1. 동일하다면 로그인 처리
				return {
					member_id: member.member_id,
					email: member.email,
					nickname: member.nickname,
				};
			} else {
				// 2.2. 동일하지 않다면 중복 이메일 오류 처리
				throw new CustomError(AuthErrorMessage.DUPLICATED_EMAIL);
			}
		} else {
			// 3. 없다면 회원가입 처리
			return this.registerMember({
				email: userInfo.email,
				nickname: userInfo.nickname,
				password: '',
				authProvider: userInfo.authProvider,
			});
		}
	}

	static async registerMember({ email, nickname, password, authProvider }) {
		const member = await MemberRepository.create({
			email,
			nickname,
			password,
			authProvider,
		});
		return {
			member_id: member.member_id,
			email: member.email,
			nickname: member.nickname,
		};
	}
}

export default OAuthService;
