import { Router } from 'express';
import ArticleController from '../controllers/articleController.js';
import checkLoggedIn from '../lib/checkLoggedIn.js';

const articleRouter = Router();

articleRouter.post('/write', checkLoggedIn, ArticleController.writeArticle);
articleRouter.get('/my', checkLoggedIn, ArticleController.showMemberArticles);
articleRouter.get('/detail/:articleId', ArticleController.showArticle);
articleRouter.get('/', ArticleController.list);
export default articleRouter;
