import { createRequestActionTypes } from '../../services/createRequestSaga';

export const INITIALIZE = 'calendar/INITIALIZE';
export const [GET_ARTICLES, GET_ARTICLES_SUCCESS, GET_ARTICLES_FAILURE] =
	createRequestActionTypes('calendar/GET_ARTICLES');
export const [GET_ARTICLES_BY_DATE, GET_ARTICLES_BY_DATE_SUCCESS, GET_ARTICLES_BY_DATE_FAILURE] =
	createRequestActionTypes('calendar/GET_ARTICLES_BY_DATE');
