import { takeLatest } from 'redux-saga/effects';
import createRequestSaga from '../../../services/createRequestSaga';
import { MODIFY_ARTICLE, WRITE_ARTICLE } from './articleEditorTypes';
import * as articleAPI from '../../../services/api/articleAPI';

const writeArticleSaga = createRequestSaga(WRITE_ARTICLE, articleAPI.write);
// 수정
export const modifyArticleSaga = createRequestSaga(MODIFY_ARTICLE, articleAPI.modifyArticle);
export function* articleEditorSaga() {
	yield takeLatest(WRITE_ARTICLE, writeArticleSaga);
	yield takeLatest(MODIFY_ARTICLE, modifyArticleSaga);
}
