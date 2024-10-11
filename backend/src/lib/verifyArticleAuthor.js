import ArticleService from '../services/articleService.js';

const verifyArticleAuthor = async (req, res, next) => {
	const memberId = req.state.member.member_id;
	const { articleId } = req.params;
	try {
		const isAuthor = await ArticleService.checkAuthor({ memberId, articleId });
		if (isAuthor) {
			return next();
		}
		return res.status(403).end();
	} catch (e) {
		return res.status(e.status).json({ message: e.message });
	}
};

export default verifyArticleAuthor;
