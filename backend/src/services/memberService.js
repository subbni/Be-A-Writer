import MemberRepository from '../repositories/memberRepository.js';

class MemberService {
	static async getMemberProfile(memberId) {
		const member = await MemberRepository.findByMemberId(memberId);
		if (member === null) {
			throw new Error('User Not Found');
		}
		return {
			nickname: member.nickname,
			member_id: member.member_id,
		};
	}
}

export default MemberService;
