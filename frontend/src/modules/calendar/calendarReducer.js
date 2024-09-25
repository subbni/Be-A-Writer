import { handleActions } from 'redux-actions';
import {
	GET_ARTICLES_BY_DATE_SUCCESS,
	GET_ARTICLES_BY_DATE_FAILURE,
	GET_ARTICLES_FAILURE,
	GET_ARTICLES_SUCCESS,
	INITIALIZE,
} from './calendarTypes';

const initialState = {
	articles: {
		data: null,
		count: null,
	},
	articlesForMonth: {
		data: null,
		count: null,
	},
	error: null,
};

const calendar = handleActions(
	{
		[INITIALIZE]: (state) => initialState,
		[GET_ARTICLES_SUCCESS]: (state, { payload: articles }) => ({
			...state,
			articles,
			articlesForMonth: articles,
		}),
		[GET_ARTICLES_FAILURE]: (state, { payload: error }) => ({
			...state,
			error,
		}),
		[GET_ARTICLES_BY_DATE_SUCCESS]: (state, { payload: articles }) => ({
			...state,
			articles,
		}),
		[GET_ARTICLES_BY_DATE_FAILURE]: (state, { payload: error }) => ({
			...state,
			error,
		}),
	},
	initialState,
);

export default calendar;
