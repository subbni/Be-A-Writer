import axios from 'axios';
import MemberModel from '../repositories/memberRepository.js';
import AuthErrorMessage from '../constants/error/authErrorMessage.js';
import AuthService from './authService.js';
import MemberRepository from '../repositories/memberRepository.js';
import { mapAuthProvider } from '../constants/authProvider.js';

class OAuthService {
	static async processSocialLogin({ code, provider }) {
		const authProvider = mapAuthProvider(provider);
		// code로 access_token 받기
		const tokenData = await this.requestAccessToken(code);
		// access_token로 userInfo 요청
		const userInfo = await this.requestUserinfo(tokenData);
		// login or register 처리

		//  1. 해당 이메일로 가입된 계정이 있는지 확인
		const member = await MemberModel.findMemberByEmail(userInfo.email);
		console.log(member);
		// 2. 있다면 현재 요청한 플랫폼과 동일한지 확인
		if (member !== null) {
			if (member.auth_provider === authProvider) {
				// 2-1. 동일하다면 로그인 처리
				return {
					member_id: member.member_id,
					email: member.email,
					nickname: member.nickname,
				};
			} else {
				// 2.2. 동일하지 않다면 중복 이메일 오류 처리
				throw new Error(AuthErrorMessage.DUPLICATED_EMAIL);
			}
		} else {
			// 3. 없다면 회원가입 처리
			return this.registerMember({
				email: userInfo.email,
				nickname: userInfo.name,
				password: '',
				authProvider: authProvider,
			});
		}
	}

	static async registerMember({ email, nickname, password, authProvider }) {
		await MemberRepository.createMember({
			email,
			nickname,
			password,
			authProvider,
		});
		return {
			email,
			nickname,
		};
	}

	static async requestAccessToken(code) {
		const res = await axios.post(process.env.GOOGLE_TOKEN_URL, {
			code: code,
			client_id: process.env.GOOGLE_CLIENT_ID,
			client_secret: process.env.GOOGLE_CLIENT_SECRET,
			redirect_uri: process.env.GOOGLE_REDIRECT_URI,
			grant_type: 'authorization_code',
		});
		return res.data;
	}

	static async requestUserinfo(data) {
		const res = await axios.get(process.env.GOOGLE_USERINFO_URL, {
			headers: {
				Authorization: `Bearer ${data.access_token}`,
			},
		});
		return res.data;
	}
}

export default OAuthService;
