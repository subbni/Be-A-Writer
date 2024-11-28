import createRequestSaga from '../../services/createRequestSaga';
import * as authAPI from '../../services/api/authAPI';
import { call, takeLatest } from 'redux-saga/effects';
import { CHECK, CHECK_FAILURE, LOGOUT } from './userActions';

const checkSaga = createRequestSaga(CHECK, authAPI.check);
function checkFailureSaga() {
	try {
		localStorage.removeItem('user');
	} catch (e) {
		console.log('localStorage is not working.');
	}
}
function* logoutSaga() {
	try {
		yield call(authAPI.logout);
		localStorage.removeItem('user');
	} catch (e) {
		console.log(e);
	}
}
export function* userSaga() {
	yield takeLatest(CHECK, checkSaga);
	yield takeLatest(CHECK_FAILURE, checkFailureSaga);
	yield takeLatest(LOGOUT, logoutSaga);
}
