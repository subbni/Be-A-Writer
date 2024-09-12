import ArticleRepository from '../repositories/articleRepository.js';
import MemberService from './memberService.js';

class ArticleService {
	static async writeArticle({ title, subtitle, content, author_id }) {
		const result = await ArticleRepository.createArticle({
			title,
			subtitle,
			content,
			author_id,
		});
		console.log(result);
		return { article_id: result.article_id };
	}

	static async getArticle(articleId) {
		const result = await ArticleRepository.findByArticleId(articleId);
		const author = await MemberService.getMemberProfile(result.author_id);
		console.log(result);
		return {
			...result,
			author: author,
		};
	}

	static async getMemberArticles(member_id) {
		const result = await ArticleRepository.findByAuthorId(member_id);
		return result;
	}
}

export default ArticleService;
