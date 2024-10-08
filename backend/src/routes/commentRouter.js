import { Router } from 'express';
import checkLoggedIn from '../lib/checkLoggedIn.js';
import CommentController from '../controllers/commentController.js';

const commentRouter = Router();

commentRouter.post('/write', checkLoggedIn, CommentController.writeComment);
commentRouter.get('/:articleId', CommentController.showComments);
commentRouter.get('/reply/:parentId', CommentController.showReplyComments);
export default commentRouter;
