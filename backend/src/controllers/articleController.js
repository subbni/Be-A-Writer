import ArticleService from '../services/articleService.js';

class ArticleController {
	/**
	 * POST /api/article/write
	 * {
	 *  title, subtitle, content, isPublic
	 * }
	 */
	static async writeArticle(req, res) {
		console.log(req.state.member);
		const { title, content } = req.body;
		if (!title || !content) {
			return res
				.status(400)
				.json({ message: 'title and content are all required' });
		}
		console.log(req.body);
		try {
			const data = await ArticleService.writeArticle({
				...req.body,
				memberId: req.state.member.memberId,
			});
			return res.status(201).json(data);
		} catch (e) {
			console.log(e);
			return res.status(e.status).json({ message: e.message });
		}
	}

	/**
	 * GET /api/article/list?page=1&limit=10
	 */
	static async list(req, res) {
		const page = parseInt(req.query.page, 10) || 1;
		const limit = parseInt(req.query.limit, 10) || 10;
		const offset = (page - 1) * limit;
		try {
			const data = await ArticleService.getAll({ limit, offset });
			return res.status(200).json(data);
		} catch (e) {
			console.log(e);
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
			console.error(e);
			return res.status(500).json({ message: 'Failed to retrieve articles' });
		}
	}

	/**
	 * GET /api/article/my?page=1&limit=5
	 */
	static async showMemberOwnArticles(req, res) {
		const memberId = req.state.member.memberId;
		const page = parseInt(req.query.page, 10) || 1;
		const limit = parseInt(req.query.limit, 10) || 10;
		const offset = (page - 1) * limit;
		try {
			const data = await ArticleService.getMemberOwnArticles(memberId, {
				limit,
				offset,
			});
			return res.status(200).json(data);
		} catch (e) {
			console.log(e.message);
			return res.status(500).json({ message: 'Failed to retrieve articles' });
		}
	}

	/**
	 * GET /api/article/member/:memberId?is_public=true&page=1&limit=5
	 */
	static async showMemberArticles(req, res) {
		const { memberId } = req.params;
		const isPublic = req.query.is_public === 'true';
		const page = parseInt(req.query.page, 10) || 1;
		const limit = parseInt(req.query.limit, 10) || 10;
		const offset = (page - 1) * limit;
		try {
			const data = await ArticleService.getMemberArticles(memberId, isPublic, {
				limit,
				offset,
			});
			return res.status(200).json(data);
		} catch (e) {
			console.log(e);
			return res.status(500).json({ message: 'Failed to retrieve articles' });
		}
	}

	/**
	 * GET /api/article/my/by-date?year=2024&month=9&day=22
	 */
	static async showMemberArticlesByDate(req, res) {
		const memberId = req.state.member.memberId;
		const { year, month, day } = req.query;

		if (!year || !month) {
			return res.status(400).send('Year and month are required.');
		}
		console.log(year, month, day);
		try {
			const data = await ArticleService.getMemberArticlesByDate(memberId, {
				year,
				month,
				day,
			});
			return res.status(200).json(data);
		} catch (e) {
			console.log(e.message);
			return res.status(500).json(e.message);
		}
	}

	/**
	 * PATCH /api/article/:articleId
	 * { title, subtitle, content, isPublic }
	 */
	static async updateArticle(req, res) {
		try {
			console.log(req.body);
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
