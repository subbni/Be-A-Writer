import ArticleService from '../services/articleService.js';

class ArticleController {
	/**
	 * POST /api/article/write
	 * {
	 *  title, subtitle, content
	 * }
	 */
	static async writeArticle(req, res) {
		console.log(req.state.member);
		const { title, subtitle, content } = req.body;
		if (!title || !content) {
			return res
				.status(400)
				.json({ message: 'title and content are all required' });
		}
		const data = await ArticleService.writeArticle({
			title,
			subtitle,
			content,
			authorId: req.state.member.member_id,
		});
		return res.status(201).json(data);
	}

	/**
	 * GET /api/article?page=1&limit=10
	 */
	static async list(req, res) {
		const page = parseInt(req.query.page, 10) || 1;
		const limit = parseInt(req.query.limit, 10) || 10;
		const offset = (page - 1) * limit;
		try {
			const data = await ArticleService.list({ limit, offset });
			return res.status(200).json(data);
		} catch (e) {
			return res.status(500).json({ message: 'Failed to retrieve articles' });
		}
	}

	/**
	 * GET /api/article/:id
	 */
	static async showArticle(req, res) {
		const { articleId } = req.params;
		try {
			const data = await ArticleService.getArticle(articleId);
			return res.status(200).json(data);
		} catch (e) {
			console.log(e.message);
			return res.status(500).json({ message: 'Failed to retrieve articles' });
		}
	}

	/**
	 * GET /api/article/my
	 */
	static async showMemberArticles(req, res) {
		const member_id = req.state.member.member_id;
		try {
			const data = await ArticleService.getMemberArticles(member_id);
			return res.status(200).json(data);
		} catch (e) {
			console.log(e.message);
			return res.status(500).json({ message: 'Failed to retrieve articles' });
		}
	}

	/**
	 * PATCH /api/article/:articleId
	 * { title, subtitle, content }
	 */
	static async updateArticle(req, res) {
		try {
			const data = await ArticleService.updateArticle(req.body);
			return res.status(200).json(data);
		} catch (e) {
			console.log(e.message);
			return res.status(e.status).json({ message: e.message });
		}
	}

	/**
	 * DELETE /api/article/:articleId
	 */
	static async deleteArticle(req, res) {
		const { articleId } = req.params;
		try {
			const data = await ArticleService.deleteArticle(articleId);
			return res.status(200).json(data);
		} catch (e) {
			console.log(e);
			return res.status(e.status).json({ message: e.message });
		}
	}
}

export default ArticleController;
