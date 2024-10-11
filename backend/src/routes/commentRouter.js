import { Router } from 'express';
import checkLoggedIn from '../lib/checkLoggedIn.js';
import CommentController from '../controllers/commentController.js';
import verifyCommentAuthor from '../lib/verifyCommentAuthor.js';

const commentRouter = Router();

commentRouter.post('/write', checkLoggedIn, CommentController.writeComment);
commentRouter.get('/:articleId', CommentController.showComments);
commentRouter.get('/reply/:parentId', CommentController.showReplyComments);
commentRouter.patch(
	'/:commentId',
	checkLoggedIn,
	verifyCommentAuthor,
	CommentController.updateComment,
);
commentRouter.delete(
	'/:commentId',
	checkLoggedIn,
	verifyCommentAuthor,
	CommentController.deleteComment,
);
export default commentRouter;
