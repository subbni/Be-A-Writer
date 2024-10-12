import CommentErrorMessage from '../constants/error/commentErrorMessage.js';
import CustomError from '../constants/error/customError.js';
import CommentRepository from '../repositories/commentRepository.js';
import ArticleService from './articleService.js';

class CommentService {
	static async writeComment(form, member_id) {
		const result = await CommentRepository.create(form, member_id);
		if (result.parent_id !== null) {
			await CommentRepository.updateRecommentCount(result.parent_id, 1);
		}
		await ArticleService.updateCommentCount(result.article_id, 1);
		return { data: result };
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

	static async updateComment({ commentId, content }) {
		const result = await CommentRepository.update({ commentId, content });
		return { data: result };
	}

	static async deleteComment(commentId) {
		const comment = await CommentRepository.findByCommentId(commentId);
		if (!comment) {
			throw new CustomError(CommentErrorMessage.COMMENT_NOT_FOUND);
		}

		const { parent_id, article_id, recomment_count } = comment;

		if (parent_id) {
			CommentRepository.updateRecommentCount(comment.parent_id, -1);
		}

		await ArticleService.updateCommentCount(article_id, -1);

		const result =
			recomment_count > 0
				? await CommentRepository.updateDeleted(commentId)
				: await CommentRepository.delete(commentId);

		return { data: result };
	}

	static async checkAuthor({ memberId, commentId }) {
		const comment = await CommentRepository.findByCommentId(commentId);
		if (!comment) {
			throw new CustomError(CommentErrorMessage.COMMENT_NOT_FOUND);
		}
		const authorId = comment.member_id;
		return memberId.toString() === authorId.toString();
	}
}

export default CommentService;
