import { createRequestActionTypes } from '../../../services/createRequestSaga';

export const [READ_ARTICLE, READ_ARTICLE_SUCCESS, READ_ARTICLE_FAILURE] =
	createRequestActionTypes('article/READ_ARTICLE');
export const [READ_MY_ARTICLES, READ_MY_ARTICLES_SUCCESS, READ_MY_ARTICLES_FAILURE] =
	createRequestActionTypes('articles/READ_MY_ARTICLES');
export const UNLOAD_ARTICLE = 'article/UNLOAD_ARTICLE';
export const UNLOAD_ARTICLES = 'article/UNLOAD_ARTICLES';
