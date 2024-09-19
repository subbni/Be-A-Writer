import { handleActions } from 'redux-actions';
import {
	DELETE_ARTICLE_FAILURE,
	DELETE_ARTICLE_SUCCESS,
	READ_ARTICLE_FAILURE,
	READ_ARTICLE_SUCCESS,
	READ_MY_ARTICLES_FAILURE,
	READ_MY_ARTICLES_SUCCESS,
	UNLOAD_ARTICLE,
	UNLOAD_ARTICLES,
} from './articlesTypes';

const initialState = {
	articles: null,
	article: null,
	error: null,
	deleted: null,
};

const articles = handleActions(
	{
		[READ_ARTICLE_SUCCESS]: (state, { payload: article }) => ({
			...state,
			article,
		}),
		[READ_ARTICLE_FAILURE]: (state, { payload: error }) => ({
			...state,
			error,
		}),
		[READ_MY_ARTICLES_SUCCESS]: (state, { payload: articles }) => ({
			...state,
			articles,
		}),
		[READ_MY_ARTICLES_FAILURE]: (state, { payload: error }) => ({
			...state,
			error,
		}),
		[UNLOAD_ARTICLE]: () => initialState,
		[UNLOAD_ARTICLES]: () => initialState,

		[DELETE_ARTICLE_SUCCESS]: (state) => ({
			...state,
			deleted: true,
		}),
		[DELETE_ARTICLE_FAILURE]: (state, { payload: error }) => ({
			...state,
			error,
		}),
	},
	initialState,
);
export default articles;
