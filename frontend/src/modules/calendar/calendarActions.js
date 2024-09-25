import { createAction } from 'redux-actions';
import { GET_ARTICLES, GET_ARTICLES_BY_DATE, INITIALIZE } from './calendarTypes';

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
