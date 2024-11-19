export default class Comment {
	constructor({
		commentId,
		articleId,
		memberId,
		content,
		parentId,
		mentionMemberId,
		recommentCount,
		createdAt,
		updatedAt,
	}) {
		this.commentId = commentId;
		this.articleId = articleId;
		this.memberId = memberId;
		this.content = content;
		this.parentId = parentId;
		this.mentionMemberId = mentionMemberId;
		this.recommentCount = recommentCount;
		this.createdAt = new Date(createdAt);
		this.updatedAt = new Date(updatedAt);
	}

	// DB에서 받아온 데이터를 카멜케이스로 변환
	static fromDb(dbData) {
		return new Comment({
			commentId: dbData.comment_id,
			articleId: dbData.article_id,
			memberId: dbData.member_id,
			content: dbData.content,
			parentId: dbData.parent_id,
			mentionMemberId: dbData.mention_member_id,
			recommentCount: dbData.recomment_count,
			createdAt: dbData.created_at,
			updatedAt: dbData.updated_at,
		});
	}
}
