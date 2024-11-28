import { createAction } from 'redux-actions';
import { createRequestActionTypes } from '../../services/createRequestSaga';

export const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';
export const CHANGE_FIELD = 'auth/CHANGE_FIELD';

export const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] =
	createRequestActionTypes('auth/REGISTER');
export const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes('auth/LOGIN');

export const [GET_USER_INFO, GET_USER_INFO_SUCCESS, GET_USER_INFO_FAILURE] =
	createRequestActionTypes('auth/GET_USER_INFO');
export const [REGISTER_USER_INFO, REGISTER_USER_INFO_SUCCESS, REGISTER_USER_INFO_FAILURE] =
	createRequestActionTypes('auth/REGISTER_USER_INFO');

export const [UPDATE_PASSWORD, UPDATE_PASSWORD_SUCCESS, UPDATE_PASSWORD_FAILURE] =
	createRequestActionTypes('auth/UPDATE_PASSWORD');

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
export const updatePassword = createAction(UPDATE_PASSWORD, ({ currentPassword, newPassword }) => ({
	currentPassword,
	newPassword,
}));
