import CustomError from '../constants/error/customError.js';
import MemberErrorMessage from '../constants/error/memberErrorMessage.js';
import MemberRepository from '../repositories/memberRepository.js';

class MemberService {
	static async getMemberProfile(memberId) {
		const member = await MemberRepository.findByMemberId(memberId);
		if (member === null) {
			console.log(`${memberId} is not Found`);
			throw new CustomError(MemberErrorMessage.MEMBER_NOT_FOUND);
		}
		return {
			nickname: member.nickname,
			member_id: member.member_id,
		};
	}
}

export default MemberService;
