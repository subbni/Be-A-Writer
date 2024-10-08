import CommentRepository from '../repositories/commentRepository.js';

class CommentService {
	static async writeComment(form, member_id) {
		const result = await CommentRepository.create(form, member_id);
		if (result.parent_id !== null) {
			await CommentRepository.updateRecommentCount(result.parent_id, 1);
		}

		return { result };
	}

	static async getArticleComments(articleId, params) {
		const data = await CommentRepository.findParentCommentByArticleId(
			articleId,
			params,
		);
		const count = await CommentRepository.getCountByArticleId(articleId);

		return { data, ...count };
	}

	static async getCountOfCommentsByArticle(articleId) {
		const result = await CommentRepository.getCountByArticleId(articleId);
		return { count: result };
	}

	static async getReplyComments(parentId) {
		const result = await CommentRepository.findReplyCommentByParentId(parentId);
		return {
			parentId,
			data: result,
		};
	}
}

export default CommentService;
