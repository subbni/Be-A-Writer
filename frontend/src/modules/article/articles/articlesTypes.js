import { createRequestActionTypes } from '../../../services/createRequestSaga';

// 조회
export const [READ_ARTICLE, READ_ARTICLE_SUCCESS, READ_ARTICLE_FAILURE] =
	createRequestActionTypes('articles/READ_ARTICLE');
export const [READ_MY_ARTICLES, READ_MY_ARTICLES_SUCCESS, READ_MY_ARTICLES_FAILURE] =
	createRequestActionTypes('articles/READ_MY_ARTICLES');
export const UNLOAD_ARTICLE = 'articles/UNLOAD_ARTICLE';
export const UNLOAD_ARTICLES = 'articles/UNLOAD_ARTICLES';

// 삭제
export const [DELETE_ARTICLE, DELETE_ARTICLE_SUCCESS, DELETE_ARTICLE_FAILURE] =
	createRequestActionTypes('articles/DELETE_ARTICLE');
