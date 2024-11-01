import CustomError from '../constants/error/customError.js';
import ArticleErrorMessage from '../constants/error/articleErrorMessage.js';
import ArticleRepository from '../repositories/articleRepository.js';
import MemberService from './memberService.js';

class ArticleService {
	static async writeArticle({ title, subtitle, content, is_public, authorId }) {
		const result = await ArticleRepository.create({
			title,
			subtitle,
			content,
			is_public,
			authorId,
		});
		return { article_id: result.article_id };
	}

	static async getArticle(articleId) {
		const result = await ArticleRepository.findByArticleId(articleId);
		if (!result) {
			throw new CustomError(ArticleErrorMessage.ARTICLE_NOT_FOUND);
		}
		const author = await MemberService.getMemberProfile(result.author_id);
		return {
			...result,
			author: author,
		};
	}

	static async getMemberOwnArticles(memberId, params) {
		const result = await ArticleRepository.findByAuthorId(memberId, params);
		return result;
	}

	static async getMemberArticles(memberId, isPublic, params) {
		const result = await ArticleRepository.findByAuthorIdAndIsPublic(
			memberId,
			isPublic,
			params,
		);
		const totalCount =
			await ArticleRepository.getTotalCountByAuthorIdAndIsPublic(
				memberId,
				isPublic,
			);
		result.totalCount = totalCount;
		return result;
	}

	static async getMemberArticlesByDate(memberId, params) {
		const result = await ArticleRepository.findByAuthorIdAndCreatedAt(
			memberId,
			params,
		);
		return result;
	}

	static async updateArticle({
		articleId,
		title,
		subtitle,
		content,
		is_public,
	}) {
		const result = await ArticleRepository.update({
			articleId,
			title,
			subtitle,
			content,
			is_public,
		});
		return { article_id: result.article_id };
	}

	static async deleteArticle(articleId) {
		const result = await ArticleRepository.delete(articleId);
		return result;
	}

	static async getAll(params) {
		const result = await ArticleRepository.findAll(params);
		return result;
	}

	static async checkAuthor({ memberId, articleId }) {
		const article = await this.checkIfArticleExist(articleId);
		const authorId = article.author_id;
		return memberId.toString() === authorId.toString();
	}

	static async updateCommentCount(articleId, amount) {
		await this.checkIfArticleExist(articleId);
		await ArticleRepository.updateCommentCount({ articleId, amount });
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
