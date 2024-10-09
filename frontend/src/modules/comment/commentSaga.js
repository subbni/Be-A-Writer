import createRequestSaga from '../../services/createRequestSaga';
import { READ_COMMENTS, READ_RECOMMENTS, WRITE_COMMENT } from './commentTypes';
import * as commentAPI from '../../services/api/commentAPI';
import { takeLatest } from 'redux-saga/effects';

export const readCommentsSaga = createRequestSaga(READ_COMMENTS, commentAPI.getComments);
export const readRecommentsSaga = createRequestSaga(READ_RECOMMENTS, commentAPI.getRecomments);
export const writeCommentsSaga = createRequestSaga(WRITE_COMMENT, commentAPI.write);

export function* commentSaga() {
	yield takeLatest(READ_COMMENTS, readCommentsSaga);
	yield takeLatest(WRITE_COMMENT, writeCommentsSaga);
	yield takeLatest(READ_RECOMMENTS, readRecommentsSaga);
}
