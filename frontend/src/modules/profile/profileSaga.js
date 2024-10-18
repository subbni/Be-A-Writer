import createRequestSaga from '../../services/createRequestSaga';
import { READ_PROFILE, UPDATE_PROFILE } from './profileTypes';
import * as memberAPI from '../../services/api/memberAPI';
import { takeLatest } from 'redux-saga/effects';

export const readProfileSaga = createRequestSaga(READ_PROFILE, memberAPI.getProfile);
export const updateProfileSaga = createRequestSaga(UPDATE_PROFILE, memberAPI.updateProfile);

export function* profileSaga() {
	yield takeLatest(READ_PROFILE, readProfileSaga);
	yield takeLatest(UPDATE_PROFILE, updateProfileSaga);
}
