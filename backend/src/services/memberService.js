import s3 from '../config/s3Client.js';
import CustomError from '../constants/error/customError.js';
import MemberErrorMessage from '../constants/error/memberErrorMessage.js';
import ImageRepository from '../repositories/imageRepository.js';
import MemberRepository from '../repositories/memberRepository.js';
import { transaction } from '../utils/dbUtil.js';
import { deleteS3Image } from '../utils/s3Util.js';
import AuthService from './authService.js';
import ImageService from './imageService.js';

class MemberService {
	// TODO : 이 자체가 사실 Service단이 아니라 Data Access Layer에서 수행되어야 하는 내용임 : DB table <-> Object
	static async getMemberProfile(memberId) {
		const member = await this.getMember(memberId);
		const data = {
			nickname: member.nickname,
			memberId: member.memberId,
		};

		if (member.profileImageId) {
			const profileImageUrl = await ImageService.getImageUrl(
				member.profileImageId,
			);
			data.profileImageUrl = profileImageUrl;
		}
		return data;
	}

	static async getDetailedMemberProfile(memberId) {
		const member = await this.getMember(memberId);
		const data = {
			nickname: member.nickname,
			memberId: member.memberId,
			bio: member.bio,
			email: member.email,
		};

		if (member.profileImageId) {
			const profileImageUrl = await ImageService.getImageUrl(
				member.profileImageId,
			);
			data.profileImageUrl = profileImageUrl;
		}
		return data;
	}

	/* 사용자 프로필 정보 변경 */
	static async updateMemberProfile({ memberId, nickname, bio }) {
		const member = await this.getMember(memberId);

		return await transaction(async (client) => {
			// 닉네임이 중복되어서는 안 된다
			if (member.nickname !== nickname) {
				const existedMember = await MemberRepository.findByNickname(
					nickname,
					client,
				);
				if (existedMember) {
					throw new CustomError(AuthErrorMessage.DUPLICATED_NICKNAME);
				}
			}
			// db에 업데이트
			const updatedMember = await MemberRepository.updateProfile(
				{
					memberId,
					nickname,
					bio,
				},
				client,
			);

			return {
				nickname: updatedMember.nickname,
				memberId: updatedMember.memberId,
				bio: updatedMember.bio,
				email: updatedMember.email,
			};
		});
	}

	/* 사용자 프로필 이미지 변경 */
	static async updateMemberProfileImage({ memberId, newImage }) {
		// 해당 멤버가 없으면 아예 중단
		const member = await this.getMember(memberId);

		// 반드시 함께 수행 되어야 하는 로직들
		transaction(async (client) => {
			// 기존 프로필 이미지가 있다면 삭제
			if (member.profileImageId) {
				await this.deleteMemberProfileImage(member, client);
			}
			// 프로필에 새로운 프로필 이미지로 업데이트 한다.
			await MemberRepository.updateProfileImage(
				{
					memberId,
					imageId: newImage.imageId,
				},
				client,
			);

			return {
				profileImageUrl: newImage.storedUrl,
			};
		});
	}

	static async deleteMemberProfileImage(member, client) {
		const deletedImage = await ImageRepository.delete(
			member.profileImageId,
			client,
		);
		// s3에서 해당 이미지 삭제 처리
		await deleteS3Image({
			Key: deletedImage.storedName,
		});
		await MemberRepository.deleteProfileImage(member.id, client);
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
