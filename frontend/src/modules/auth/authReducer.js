import { handleActions } from 'redux-actions';
import { produce } from 'immer';
import {
	CHANGE_FIELD,
	INITIALIZE_FORM,
	REGISTER_SUCCESS,
	REGISTER_FAILURE,
	LOGIN_SUCCESS,
	LOGIN_FAILURE,
	GET_USER_INFO_SUCCESS,
	GET_USER_INFO_FAILURE,
	REGISTER_USER_INFO_SUCCESS,
	REGISTER_USER_INFO_FAILURE,
	UPDATE_PASSWORD_SUCCESS,
	UPDATE_PASSWORD_FAILURE,
} from './authActions';

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
	password: {
		message: null,
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
		[UPDATE_PASSWORD_SUCCESS]: (state, { payload: password }) => ({
			...state,
			password,
		}),
		[UPDATE_PASSWORD_FAILURE]: (state, { payload: error }) => ({
			...state,
			authError: error,
		}),
	},
	initialState,
);

export default auth;
