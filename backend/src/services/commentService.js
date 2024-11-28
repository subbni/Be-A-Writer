import CommentErrorMessage from '../constants/error/commentErrorMessage.js';
import CustomError from '../constants/error/customError.js';
import ArticleRepository from '../repositories/articleRepository.js';
import CommentRepository from '../repositories/commentRepository.js';
import { transaction } from '../utils/dbUtil.js';
import ArticleService from './articleService.js';

class CommentService {
	static async writeComment(form, memberId) {
		const result = await CommentRepository.create({ ...form, memberId });
		if (result.parentId !== null) {
			await CommentRepository.updateRecommentCount({
				commentId: result.parentId,
				amount: 1,
			});
		}
		await ArticleService.updateCommentCount(result.articleId, 1);
		return { data: result };
	}

	static async getArticleComments(articleId, params) {
		const data = await CommentRepository.findParentCommentByArticleId({
			articleId,
			...params,
		});
		const totalCount = await CommentRepository.getCountByArticleId(articleId);
		const parentCount =
			await CommentRepository.getParentCommentCountByArticleId(articleId);

		return { data, totalCount, parentCount };
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
		return await transaction(async (client) => {
			const comment = await CommentRepository.findByCommentId(
				commentId,
				client,
			);
			if (!comment) {
				throw new CustomError(CommentErrorMessage.COMMENT_NOT_FOUND);
			}

			const { parentId, articleId, recommentCount } = comment;

			if (parentId) {
				await CommentRepository.updateRecommentCount(
					{
						commentId: comment.parentId,
						amount: -1,
					},
					client,
				);
			}

			await ArticleRepository.updateCommentCount(
				{ articleId, amount: -1 },
				client,
			);

			const result =
				recommentCount > 0
					? await CommentRepository.updateDeleted(commentId, client)
					: await CommentRepository.delete(commentId, client);

			return { data: result };
		});
	}

	static async checkAuthor({ memberId, commentId }) {
		const comment = await CommentRepository.findByCommentId(commentId);
		if (!comment) {
			throw new CustomError(CommentErrorMessage.COMMENT_NOT_FOUND);
		}
		const authorId = comment.memberId;
		return memberId.toString() === authorId.toString();
	}
}

export default CommentService;
