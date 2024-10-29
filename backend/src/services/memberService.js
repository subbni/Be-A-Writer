import s3 from '../config/s3Client.js';
import CustomError from '../constants/error/customError.js';
import MemberErrorMessage from '../constants/error/memberErrorMessage.js';
import ImageRepository from '../repositories/imageRepository.js';
import MemberRepository from '../repositories/memberRepository.js';
import AuthService from './authService.js';
import ImageService from './imageService.js';

class MemberService {
	static async getMemberProfile(memberId) {
		const member = await this.getMember(memberId);
		const data = {
			nickname: member.nickname,
			memberId: member.member_id,
		};

		if (member.profile_image_id) {
			const profileImageUrl = await ImageService.getImageUrl(
				member.profile_image_id,
			);
			data.profileImageUrl = profileImageUrl;
		}
		return data;
	}

	static async getDetailedMemberProfile(memberId) {
		const member = await this.getMember(memberId);
		const data = {
			nickname: member.nickname,
			memberId: member.member_id,
			bio: member.bio,
			email: member.email,
		};

		if (member.profile_image_id) {
			const profileImageUrl = await ImageService.getImageUrl(
				member.profile_image_id,
			);
			data.profileImageUrl = profileImageUrl;
		}
		return data;
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
			memberId: updatedMember.member_id,
			bio: updatedMember.bio,
			email: updatedMember.email,
			profileImageUrl: updatedMember.profile_image_url,
		};
	}

	static async updateMemberProfileImage({ memberId, file }) {
		const member = await this.getMember(memberId);

		// 기존 프로필 이미지가 있다면 삭제
		this.deleteMemberProfileImage(member);

		const data = {
			nickname: member.nickname,
			memberId: member.member_id,
			bio: member.bio,
			email: member.email,
			profileImageUrl: null,
		};

		if (file) {
			const newImage = await ImageService.saveProfileImage(file);
			const updatedMember = await MemberRepository.updateProfileImage({
				memberId,
				imageId: newImage.image_id,
			});
			data.profileImageUrl = updatedMember.profile_image_url;
		}
		return data;
	}

	static async deleteMemberProfileImage(member) {
		if (member.profile_image_id) {
			try {
				await ImageService.deleteImage(member.profile_image_id);
			} catch (e) {
				console.log(e);
			}
			await MemberRepository.deleteProfileImage(member.id);
		}
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
