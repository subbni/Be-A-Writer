export default class Article {
	constructor({
		articleId,
		title,
		subtitle,
		content,
		authorId,
		createdAt,
		updatedAt,
		isPublic,
		commentCount,
	}) {
		this.articleId = articleId;
		this.authorId = authorId;
		this.title = title;
		this.subtitle = subtitle;
		this.content = content;
		this.createdAt = new Date(createdAt);
		this.updatedAt = new Date(updatedAt);
		this.commentCount = commentCount;
		this.isPublic = isPublic;
	}

	static fromDb(dbData) {
		return new Article({
			articleId: dbData.article_id,
			title: dbData.title,
			subtitle: dbData.subtitle,
			content: dbData.content,
			authorId: dbData.author_id,
			createdAt: dbData.created_at,
			updatedAt: dbData.updated_at,
			isPublic: dbData.is_public,
			commentCount: dbData.comment_count,
		});
	}
}
