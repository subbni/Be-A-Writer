import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';

const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

export const changeField = createAction(
	CHANGE_FIELD,
	({ form, key, value }) => ({
		form, // (register/login)
		key, // field name
		value, // value
	}),
);
export const initializeForm = createAction(INITIALIZE_FORM, (form) => form);

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
};

const auth = handleActions(
	{
		[CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
			produce(state, (draft) => {
				draft[form][key] = value;
			}),
		[INITIALIZE_FORM]: (state, { payload: { form } }) => ({
			...state,
			[form]: initialState[form],
		}),
	},
	initialState,
);

export default auth;
