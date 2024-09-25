import { Router } from 'express';
import ArticleController from '../controllers/articleController.js';
import checkLoggedIn from '../lib/checkLoggedIn.js';
import verifyArticleAuthor from '../lib/verifyArticleAuthor.js';

const articleRouter = Router();

articleRouter.post('/write', checkLoggedIn, ArticleController.writeArticle);
articleRouter.get('/my', checkLoggedIn, ArticleController.showMemberArticles);
articleRouter.get(
	'/my/by-date',
	checkLoggedIn,
	ArticleController.showMemberArticlesByDate,
);
articleRouter.get('/list', ArticleController.list);
articleRouter.get('/detail/:articleId', ArticleController.showArticle);
articleRouter.patch(
	'/:articleId',
	checkLoggedIn,
	verifyArticleAuthor,
	ArticleController.updateArticle,
);
articleRouter.delete(
	'/:articleId',
	checkLoggedIn,
	verifyArticleAuthor,
	ArticleController.deleteArticle,
);
export default articleRouter;
