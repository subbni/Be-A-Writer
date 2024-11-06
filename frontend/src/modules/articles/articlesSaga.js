import createRequestSaga from '../../services/createRequestSaga.js';
import {
	DELETE_ARTICLE,
	READ_ALL_ARTICLES,
	READ_ARTICLE,
	READ_MY_ARTICLES,
	READ_USER_ARTICLES,
} from './articlesTypes.js';
import * as articleAPI from '../../services/api/articleAPI.js';
import { takeLatest } from 'redux-saga/effects';

// 조회
export const readArticleSaga = createRequestSaga(READ_ARTICLE, articleAPI.getArticle);
export const readMyArticlesSaga = createRequestSaga(READ_MY_ARTICLES, articleAPI.getMyArticles);
export const readAllArticlesSaga = createRequestSaga(READ_ALL_ARTICLES, articleAPI.getAllArticles);
export const readUserArticlesSaga = createRequestSaga(
	READ_USER_ARTICLES,
	articleAPI.getMemberArticles,
);
// 삭제
export const deleteArticleSaga = createRequestSaga(DELETE_ARTICLE, articleAPI.deleteArticle);
export function* articlesSaga() {
	yield takeLatest(READ_ARTICLE, readArticleSaga);
	yield takeLatest(READ_MY_ARTICLES, readMyArticlesSaga);
	yield takeLatest(DELETE_ARTICLE, deleteArticleSaga);
	yield takeLatest(READ_ALL_ARTICLES, readAllArticlesSaga);
	yield takeLatest(READ_USER_ARTICLES, readUserArticlesSaga);
}
