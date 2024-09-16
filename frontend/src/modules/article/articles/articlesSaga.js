import createRequestSaga from '../../../services/createRequestSaga.js';
import { READ_ARTICLE, READ_MY_ARTICLES } from './articlesTypes.js';
import * as articleAPI from '../../../services/api/articleAPI.js';
import { takeLatest } from 'redux-saga/effects';

export const readArticleSaga = createRequestSaga(READ_ARTICLE, articleAPI.getArticle);
export const readMyArticlesSaga = createRequestSaga(READ_MY_ARTICLES, articleAPI.getMyArticles);
export function* articlesSaga() {
	yield takeLatest(READ_ARTICLE, readArticleSaga);
	yield takeLatest(READ_MY_ARTICLES, readMyArticlesSaga);
}
