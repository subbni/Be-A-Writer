import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import createRequestSaga, { createRequestActionTypes } from '../../services/createRequestSaga';
import * as authAPI from '../../services/api/authAPI';
import { takeLatest } from 'redux-saga/effects';

const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';
const CHANGE_FIELD = 'auth/CHANGE_FIELD';

const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] = createRequestActionTypes('auth/REGISTER');
const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes('auth/LOGIN');

const [GET_USER_INFO, GET_USER_INFO_SUCCESS, GET_USER_INFO_FAILURE] =
	createRequestActionTypes('auth/GET_USER_INFO');
const [REGISTER_USER_INFO, REGISTER_USER_INFO_SUCCESS, REGISTER_USER_INFO_FAILURE] =
	createRequestActionTypes('auth/REGISTER_USER_INFO');

export const initializeForm = createAction(INITIALIZE_FORM, (form) => form);
export const changeField = createAction(CHANGE_FIELD, ({ form, key, value }) => ({
	form, // (register/login)
	key, // field name
	value, // value
}));
export const register = createAction(REGISTER, ({ email, nickname, password }) => ({
	email,
	nickname,
	password,
}));
export const login = createAction(LOGIN, ({ email, password }) => ({
	email,
	password,
}));
export const getUserInfo = createAction(GET_USER_INFO);
export const registerUserInfo = createAction(
	REGISTER_USER_INFO,
	({ email, nickname, password, authProvider }) => ({ email, nickname, password, authProvider }),
);

// ============= redux - saga ================ //
const registerSaga = createRequestSaga(REGISTER, authAPI.register);
const loginSaga = createRequestSaga(LOGIN, authAPI.login);
const getUserInfoSaga = createRequestSaga(GET_USER_INFO, authAPI.getUserInfo);
const registerUserInfoSaga = createRequestSaga(REGISTER_USER_INFO, authAPI.registerUserInfo);

export function* authSaga() {
	yield takeLatest(REGISTER, registerSaga);
	yield takeLatest(LOGIN, loginSaga);
	yield takeLatest(GET_USER_INFO, getUserInfoSaga);
	yield takeLatest(REGISTER_USER_INFO, registerUserInfoSaga);
}

const initialState = {
	register: {
		email: '',
		nickname: '',
		password: '',
		passwordConfirm: '',
	},
	login: {
		email: '',
		password: '',
	},
	userInfo: {
		email: '',
		nickname: '',
		password: '',
		authProvider: '',
	},
	auth: null,
	authError: null,
};

const auth = handleActions(
	{
		[CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
			produce(state, (draft) => {
				draft[form][key] = value;
			}),
		[INITIALIZE_FORM]: (state, { payload: form }) => ({
			...state,
			[form]: initialState[form],
			authError: null,
			auth: null,
		}),
		[REGISTER_SUCCESS]: (state, { payload: auth }) => ({
			...state,
			authError: null,
			auth,
		}),
		[REGISTER_FAILURE]: (state, { payload: error }) => ({
			...state,
			authError: error,
		}),
		[LOGIN_SUCCESS]: (state, { payload: auth }) => ({
			...state,
			authError: null,
			auth,
		}),
		[LOGIN_FAILURE]: (state, { payload: error }) => ({
			...state,
			authError: error,
		}),
		[GET_USER_INFO_SUCCESS]: (state, { payload: userInfo }) => ({
			...state,
			authError: null,
			...userInfo,
		}),
		[GET_USER_INFO_FAILURE]: (state, { payload: error }) => ({
			...state,
			authError: error,
		}),
		[REGISTER_USER_INFO_SUCCESS]: (state, { payload: auth }) => ({
			...state,
			authError: null,
			auth,
		}),
		[REGISTER_USER_INFO_FAILURE]: (state, { payload: error }) => ({
			...state,
			authError: error,
		}),
	},
	initialState,
);

export default auth;
