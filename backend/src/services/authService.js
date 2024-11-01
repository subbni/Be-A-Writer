import AuthErrorMessage from '../constants/error/authErrorMessage.js';
import CustomError from '../constants/error/customError.js';
import MemberRepository from '../repositories/memberRepository.js';
import * as passwordUtil from '../utils/passwordUtil.js';
import ImageService from './imageService.js';
import MemberService from './memberService.js';

class AuthService {
	static async registerMember({ email, password, nickname, authProvider }) {
		await this.checkIfEmailExist(email);
		await this.checkIfNicknameIsTaken(nickname);

		const hashedPassword = await passwordUtil.hashPassword(password);
		await MemberRepository.create({
			email,
			password: hashedPassword,
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
		await passwordUtil.verifyPassword(password, member.password);
		const data = {
			member_id: member.member_id,
			email: member.email,
			nickname: member.nickname,
		};
		if (member.profile_image_id) {
			const profileImageUrl = await ImageService.getImageUrl(
				member.profile_image_id,
			);
			data.profileImageUrl = profileImageUrl;
		}
		return data;
	}

	static async updatePassword({ memberId, currentPassword, newPassword }) {
		const member = await MemberService.getMember(memberId);
		await passwordUtil.verifyPassword(currentPassword, member.password);
		const newHashedPassword = await passwordUtil.hashPassword(newPassword);
		await MemberRepository.updatePassword(memberId, newHashedPassword);
		return {
			message: '비밀번호 변경 완료!',
		};
	}

	static async checkIfEmailExist(email) {
		const existedMember = await MemberRepository.findByEmail(email);
		if (existedMember) {
			throw new CustomError(AuthErrorMessage.DUPLICATED_EMAIL);
		}
	}
	static async checkIfNicknameIsTaken(nickname) {
		const existedMember = await MemberRepository.findByNickname(nickname);
		if (existedMember) {
			throw new CustomError(AuthErrorMessage.DUPLICATED_NICKNAME);
		}
	}
}

export default AuthService;
