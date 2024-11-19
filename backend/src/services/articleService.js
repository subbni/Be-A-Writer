import CustomError from '../constants/error/customError.js';
import ArticleErrorMessage from '../constants/error/articleErrorMessage.js';
import ArticleRepository from '../repositories/articleRepository.js';
import MemberService from './memberService.js';
import MemberRepository from '../repositories/memberRepository.js';
import { transaction } from '../utils/dbUtil.js';
import CommentRepository from '../repositories/commentRepository.js';

class ArticleService {
	static async writeArticle({ title, subtitle, content, isPublic, memberId }) {
		const result = await ArticleRepository.create({
			title,
			subtitle,
			content,
			isPublic,
			memberId,
		});
		return { articleId: result.articleId };
	}

	static async getArticle(articleId) {
		const result = await ArticleRepository.findByArticleId(articleId);
		if (!result) {
			throw new CustomError(ArticleErrorMessage.ARTICLE_NOT_FOUND);
		}
		const author = await MemberService.getMemberProfile(result.authorId);
		return {
			...result,
			author: author,
		};
	}

	static async getMemberOwnArticles(memberId, params) {
		console.log(memberId);
		const result = await ArticleRepository.findByAuthorId({
			memberId,
			...params,
		});
		console.log(result);
		return result;
	}

	static async getMemberArticles(memberId, isPublic, params) {
		const result = await ArticleRepository.findByAuthorIdAndIsPublic({
			memberId,
			isPublic,
			...params,
		});
		const totalCount =
			await ArticleRepository.getTotalCountByAuthorIdAndIsPublic({
				memberId,
				isPublic,
			});
		result.totalCount = totalCount;
		return result;
	}

	static async getMemberArticlesByDate(memberId, params) {
		const result = await ArticleRepository.findByAuthorIdAndCreatedAt({
			memberId,
			...params,
		});
		return result;
	}

	static async updateArticle({
		articleId,
		title,
		subtitle,
		content,
		isPublic,
	}) {
		const result = await ArticleRepository.update({
			articleId,
			title,
			subtitle,
			content,
			isPublic,
		});
		return { articleId: result.articleId };
	}

	static async deleteArticle(articleId) {
		return await transaction(async (client) => {
			const result = await ArticleRepository.delete(articleId, client);
			// 댓글도 함께 삭제 처리
			await CommentRepository.deleteByArticleId(articleId, client);
			return result;
		});
	}

	static async getAll(params) {
		const result = await ArticleRepository.findAll({ ...params });
		return result;
	}

	static async checkAuthor({ memberId, articleId }) {
		const article = await this.checkIfArticleExist(articleId);
		const authorId = article.authorId;
		return memberId.toString() === authorId.toString();
	}

	static async updateCommentCount(articleId, amount) {
		await transaction(async (client) => {
			await ArticleRepository.updateCommentCount({ articleId, amount }, client);
		});
	}

	static async checkIfArticleExist(articleId) {
		const article = await ArticleRepository.findByArticleId(articleId);
		if (!article) {
			throw new CustomError(ArticleErrorMessage.ARTICLE_NOT_FOUND);
		}
		return article;
	}
}

export default ArticleService;
