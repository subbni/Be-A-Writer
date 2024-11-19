import CommentService from '../services/commentService.js';

const verifyCommentAuthor = async (req, res, next) => {
	const memberId = req.state.member.memberId;
	const { commentId } = req.params;
	try {
		const isAuthor = await CommentService.checkAuthor({ memberId, commentId });
		if (isAuthor) {
			return next();
		}
		return res.status(403).end();
	} catch (e) {
		return res.status(e.status).json({ message: e.message });
	}
};

export default verifyCommentAuthor;
