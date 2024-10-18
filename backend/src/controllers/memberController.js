import MemberService from '../services/memberService.js';
import { areAllFieldsDefined } from '../utils/helpers.js';

class MemberController {
	/**
	 * GET /api/member/:memberId
	 */
	static async getMemberProfile(req, res) {
		const { memberId } = req.params;
		try {
			const data = await MemberService.getDetailedMemberProfile(memberId);
			return res.status(200).json(data);
		} catch (e) {
			console.log(e);
			return res.status(e.status || 500).json({ message: e.message });
		}
	}

	/**
	 * patch /api/member/profile
	 * { memberId, nickname, bio }
	 */
	static async updateMemberProfile(req, res) {
		const { memberId, nickname } = req.body;
		const currentMemberId = req.state.member.member_id;
		if (memberId !== currentMemberId) {
			return res.status(403).json({ message: '프로필 수정 권한이 없습니다.' });
		}
		if (!areAllFieldsDefined({ memberId, nickname })) {
			return res
				.status(400)
				.json({ message: 'memberId and nickname fields are required' });
		}
		try {
			const data = await MemberService.updateMemberProfile(req.body);
			return res.status(200).json(data);
		} catch (e) {
			console.log(e);
			return res.status(e.status || 500).json({ message: e.message });
		}
	}
}

export default MemberController;