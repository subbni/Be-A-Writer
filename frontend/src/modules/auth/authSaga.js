import createRequestSaga from '../../services/createRequestSaga';
import * as authAPI from '../../services/api/authAPI';
import * as oauthAPI from '../../services/api/oauthAPI';
import { takeLatest } from 'redux-saga/effects';
import { REGISTER, LOGIN, GET_USER_INFO, REGISTER_USER_INFO, UPDATE_PASSWORD } from './authActions';

const registerSaga = createRequestSaga(REGISTER, authAPI.register);
const loginSaga = createRequestSaga(LOGIN, authAPI.login);
const getUserInfoSaga = createRequestSaga(GET_USER_INFO, oauthAPI.getUserInfo);
const registerUserInfoSaga = createRequestSaga(REGISTER_USER_INFO, oauthAPI.registerUserInfo);
const updatePasswordSaga = createRequestSaga(UPDATE_PASSWORD, authAPI.updatePassword);

export function* authSaga() {
	yield takeLatest(REGISTER, registerSaga);
	yield takeLatest(LOGIN, loginSaga);
	yield takeLatest(GET_USER_INFO, getUserInfoSaga);
	yield takeLatest(REGISTER_USER_INFO, registerUserInfoSaga);
	yield takeLatest(UPDATE_PASSWORD, updatePasswordSaga);
}
