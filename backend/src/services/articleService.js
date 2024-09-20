import CustomError from '../constants/error/customError.js';
import ArticleErrorMessage from '../constants/error/articleErrorMessage.js';
import ArticleRepository from '../repositories/articleRepository.js';
import MemberService from './memberService.js';

class ArticleService {
	static async writeArticle({ title, subtitle, content, authorId }) {
		const result = await ArticleRepository.create({
			title,
			subtitle,
			content,
			authorId,
		});
		console.log(result);
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

	static async getMemberArticles(memberId, params) {
		const result = await ArticleRepository.findByAuthorId(memberId, params);
		return result;
	}

	static async updateArticle({ articleId, title, subtitle, content }) {
		const result = await ArticleRepository.update({
			articleId,
			title,
			subtitle,
			content,
		});
		return { article_id: result.article_id };
	}

	static async deleteArticle(articleId) {
		const result = await ArticleRepository.delete(articleId);
		return result;
	}

	static async checkAuthor({ memberId, articleId }) {
		const article = await ArticleRepository.findByArticleId(articleId);
		if (!article) {
			throw new CustomError(ArticleErrorMessage.ARTICLE_NOT_FOUND);
		}
		const authorId = article.author_id;
		console.log('author_id =', article.author_id);
		return memberId.toString() === authorId.toString();
	}
}

export default ArticleService;
