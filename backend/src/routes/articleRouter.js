import { Router } from 'express';
import ArticleController from '../controllers/articleController.js';
import checkLoggedIn from '../lib/checkLoggedIn.js';

const articleRouter = Router();

articleRouter.post('/write', checkLoggedIn, ArticleController.writeArticle);
articleRouter.get('/', ArticleController.list);
export default articleRouter;
