import CommentService from '../services/commentService.js';

class CommentController {
	/**
	 * POST /api/comment
	 */
	static async writeComment(req, res) {
		const memberId = req.state.member.memberId;
		console.log(req.body);
		try {
			const result = await CommentService.writeComment(req.body, memberId);
			res.status(201).json(result);
		} catch (e) {
			console.error(e);
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
	 * GET /api/comment/reply/:parentId
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

	/**
	 * DELETE /api/comment/:commentId
	 */
	static async deleteComment(req, res) {
		const { commentId } = req.params;
		try {
			const data = await CommentService.deleteComment(commentId);
			return res.status(200).json(data);
		} catch (e) {
			return res.status(500).json({ message: e.message });
		}
	}

	/**
	 * PATCH /api/comment/:commentId
	 * { content }
	 */
	static async updateComment(req, res) {
		const { commentId } = req.params;
		console.log(req.body);
		try {
			const data = await CommentService.updateComment({
				commentId,
				...req.body,
			});
			return res.status(200).json(data);
		} catch (e) {
			console.log(e.message);
			return res.status(500).json({ message: e.message });
		}
	}
}

export default CommentController;
