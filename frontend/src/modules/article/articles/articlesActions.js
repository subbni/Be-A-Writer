import { createAction } from 'redux-actions';
import {
	DELETE_ARTICLE,
	READ_ARTICLE,
	READ_MY_ARTICLES,
	UNLOAD_ARTICLE,
	UNLOAD_ARTICLES,
} from './articlesTypes';

export const readArticle = createAction(READ_ARTICLE, (id) => id);
export const readMyArticles = createAction(READ_MY_ARTICLES);
export const unloadArticle = createAction(UNLOAD_ARTICLE);
export const unloadArticles = createAction(UNLOAD_ARTICLES);

export const deleteArticle = createAction(DELETE_ARTICLE, (id) => id);
