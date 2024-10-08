import CommentService from '../services/commentService.js';

class CommentController {
	/**
	 * POST /api/comment
	 */
	static async writeComment(req, res) {
		const member_id = req.state.member.member_id;
		console.log(req.body);
		try {
			const result = await CommentService.writeComment(req.body, member_id);
			res.status(201).json(result);
		} catch (e) {
			console.log(e);
			return res.status(500).json(e.message);
		}
	}

	/**
	 * GET /api/comment/:articleId?page=1&limit=5
	 */
	static async showComments(req, res) {
		const { articleId } = req.params;
		const page = parseInt(req.query.page, 10) || 1;
		const limit = parseInt(req.query.limit, 10) || 10;
		const offset = (page - 1) * limit;
		try {
			const data = await CommentService.getArticleComments(articleId, {
				limit,
				offset,
			});
			return res.status(200).json(data);
		} catch (e) {
			console.log(e.message);
			return res.status(500).json({ message: 'Failed to retrieve comments' });
		}
	}

	/**
	 * GET /api/comment/reply:parentId
	 */
	static async showReplyComments(req, res) {
		const { parentId } = req.params;
		try {
			const data = await CommentService.getReplyComments(parentId);
			return res.status(200).json(data);
		} catch (e) {
			console.log(e.message);
			return res.status(500).json(e.message);
		}
	}
}

export default CommentController;
