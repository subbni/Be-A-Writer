import CustomError from '../constants/error/customError.js';
import MemberErrorMessage from '../constants/error/memberErrorMessage.js';
import MemberRepository from '../repositories/memberRepository.js';
import { hashPassword, verifyPassword } from '../utils/passwordUtil.js';
import AuthService from './authService.js';

class MemberService {
	static async getMemberProfile(memberId) {
		const member = await this.getMember(memberId);
		return {
			nickname: member.nickname,
			member_id: member.member_id,
		};
	}

	static async getDetailedMemberProfile(memberId) {
		const member = await this.getMember(memberId);
		return {
			nickname: member.nickname,
			member_id: member.member_id,
			bio: member.bio,
			email: member.email,
		};
	}

	static async updateMemberProfile({ memberId, nickname, bio }) {
		const member = await this.getMember(memberId);
		if (member.nickname !== nickname) {
			await AuthService.checkIfNicknameIsTaken(nickname);
		}
		const updatedMember = await MemberRepository.updateProfile({
			memberId,
			nickname,
			bio,
		});

		return {
			nickname: updatedMember.nickname,
			member_id: updatedMember.member_id,
			bio: updatedMember.bio,
			email: updatedMember.email,
		};
	}

	static async getMember(memberId) {
		const member = await MemberRepository.findByMemberId(memberId);
		if (!member) {
			console.error('member 찾기 실패');
			console.log(`${memberId} is not Found`);
			throw new CustomError(MemberErrorMessage.MEMBER_NOT_FOUND);
		}
		return member;
	}
}

export default MemberService;
