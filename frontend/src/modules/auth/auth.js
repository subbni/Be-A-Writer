import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import createRequestSaga, { createRequestActionTypes } from '../../services/createRequestSaga';
import * as authAPI from '../../services/api/authAPI';
import { takeLatest } from 'redux-saga/effects';

const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';
const CHANGE_FIELD = 'auth/CHANGE_FIELD';

const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] = createRequestActionTypes('auth/REGISTER');
const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes('auth/LOGIN');

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

// ============= redux - saga ================ //
const registerSaga = createRequestSaga(REGISTER, authAPI.register);
const loginSaga = createRequestSaga(LOGIN, authAPI.login);
export function* authSaga() {
	yield takeLatest(REGISTER, registerSaga);
	yield takeLatest(LOGIN, loginSaga);
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
	},
	initialState,
);

export default auth;
