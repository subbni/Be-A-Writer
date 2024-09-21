import { createAction } from 'redux-actions';
import {
	DELETE_ARTICLE,
	READ_ALL_ARTICLES,
	READ_ARTICLE,
	READ_MY_ARTICLES,
	UNLOAD_ARTICLE,
	UNLOAD_ARTICLES,
} from './articlesTypes';

export const readArticle = createAction(READ_ARTICLE, (id) => id);
export const readMyArticles = createAction(READ_MY_ARTICLES, ({ page, limit }) => ({
	page,
	limit,
}));
export const readAllArticles = createAction(READ_ALL_ARTICLES, ({ page, limit }) => ({
	page,
	limit,
}));

export const unloadArticle = createAction(UNLOAD_ARTICLE);
export const unloadArticles = createAction(UNLOAD_ARTICLES);

export const deleteArticle = createAction(DELETE_ARTICLE, (id) => id);
