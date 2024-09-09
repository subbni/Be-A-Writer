import ArticleRepository from '../repositories/articleRepository.js';

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
}

export default ArticleService;
