import createRequestSaga from '../../services/createRequestSaga';
import { READ_COMMENTS, WRITE_COMMENT } from './commentTypes';
import * as commentAPI from '../../services/api/commentAPI';
import { takeLatest } from 'redux-saga/effects';

export const readCommentsSaga = createRequestSaga(READ_COMMENTS, commentAPI.getComments);
export const writeCommentsSaga = createRequestSaga(WRITE_COMMENT, commentAPI.write);

export function* commentSaga() {
	yield takeLatest(READ_COMMENTS, readCommentsSaga);
	yield takeLatest(WRITE_COMMENT, writeCommentsSaga);
}