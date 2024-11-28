import ImageService from '../services/imageService.js';
import MemberService from '../services/memberService.js';

class ImageController {
	/**
	 * POST /api/image/profile
	 */
	static async uploadProfileImage(req, res) {
		try {
			if (req.file) {
				console.log(req.file);
				const ImagaData = await ImageService.saveProfileImage(req.file);
				const data = await MemberService.updateMemberProfileImage({
					memberId: req.state.member.memberId,
					imageId: ImagaData.imageId,
				});
				return res.status(200).json(data);
			} else {
				return res.status(200).json({ message: 's3 업로드 실패' });
			}
		} catch (e) {
			console.log(e.message);
			return res.status(500).json({ message: e.message });
		}
	}
}

export default ImageController;
