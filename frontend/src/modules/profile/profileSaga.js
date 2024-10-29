import createRequestSaga from '../../services/createRequestSaga';
import {
	READ_PROFILE,
	UPDATE_PROFILE,
	UPDATE_PROFILE_FAILURE,
	UPDATE_PROFILE_IMAGE,
} from './profileTypes';
import * as memberAPI from '../../services/api/memberAPI';
import { takeLatest } from 'redux-saga/effects';

export const readProfileSaga = createRequestSaga(READ_PROFILE, memberAPI.getProfile);
export const updateProfileSaga = createRequestSaga(UPDATE_PROFILE, memberAPI.updateProfile);
export const updateProfileImageSaga = createRequestSaga(
	UPDATE_PROFILE_IMAGE,
	memberAPI.updateProfileImage,
);

export function* profileSaga() {
	yield takeLatest(READ_PROFILE, readProfileSaga);
	yield takeLatest(UPDATE_PROFILE, updateProfileSaga);
	yield takeLatest(UPDATE_PROFILE_IMAGE, updateProfileImageSaga);
}
