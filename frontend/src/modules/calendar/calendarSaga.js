import { takeLatest } from 'redux-saga/effects';
import * as articleAPI from '../../services/api/articleAPI.js';
import createRequestSaga from '../../services/createRequestSaga.js';
import { GET_ARTICLES, GET_ARTICLES_BY_DATE } from './calendarTypes.js';

export const getArticlesSaga = createRequestSaga(GET_ARTICLES, articleAPI.getMyArticlesByDate);
export const getArticlesByDateSaga = createRequestSaga(
	GET_ARTICLES_BY_DATE,
	articleAPI.getMyArticlesByDate,
);
export function* calendarSaga() {
	yield takeLatest(GET_ARTICLES, getArticlesSaga);
	yield takeLatest(GET_ARTICLES_BY_DATE, getArticlesByDateSaga);
}
