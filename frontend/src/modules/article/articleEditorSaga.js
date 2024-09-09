import { takeLatest } from 'redux-saga/effects';
import createRequestSaga from '../../services/createRequestSaga';
import { WRITE_ARTICLE } from './articleEditorTypes';
import * as articleAPI from '../../services/api/articleAPI';

const writeArticleSaga = createRequestSaga(WRITE_ARTICLE, articleAPI.write);
export function* articleEditorSaga() {
	yield takeLatest(WRITE_ARTICLE, writeArticleSaga);
}
