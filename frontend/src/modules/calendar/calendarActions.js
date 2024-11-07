import { createAction } from 'redux-actions';
import { createRequestActionTypes } from '../../services/createRequestSaga';

export const INITIALIZE = 'calendar/INITIALIZE';
export const [GET_ARTICLES, GET_ARTICLES_SUCCESS, GET_ARTICLES_FAILURE] =
	createRequestActionTypes('calendar/GET_ARTICLES');
export const [GET_ARTICLES_BY_DATE, GET_ARTICLES_BY_DATE_SUCCESS, GET_ARTICLES_BY_DATE_FAILURE] =
	createRequestActionTypes('calendar/GET_ARTICLES_BY_DATE');

export const initialize = createAction(INITIALIZE);
export const getArticles = createAction(GET_ARTICLES, ({ year, month }) => ({
	year,
	month,
}));
export const getArticlesByDate = createAction(
	GET_ARTICLES_BY_DATE,
	({ year, month, day = null }) => ({
		year,
		month,
		day,
	}),
);
