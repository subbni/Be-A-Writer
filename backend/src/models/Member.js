export default class Member {
	constructor({
		memberId,
		email,
		password,
		nickname,
		authProvider,
		bio,
		profileImageId,
	}) {
		this.memberId = memberId;
		this.email = email;
		this.password = password;
		this.nickname = nickname;
		this.authProvider = authProvider;
		this.bio = bio;
		this.profileImageId = profileImageId;
	}

	// DB에서 받아온 데이터를 카멜케이스로 변환
	static fromDb(dbData) {
		return new Member({
			memberId: dbData.member_id,
			email: dbData.email,
			password: dbData.password,
			nickname: dbData.nickname,
			authProvider: dbData.auth_provider,
			bio: dbData.bio,
			profileImageId: dbData.profile_image_id,
		});
	}

	static toJWTData(member) {
		return {
			memberId: member.memberId,
			email: member.email,
			nickname: member.nickname,
		};
	}

	static toResponse() {}
}
