import { handleActions } from 'redux-actions';
import { CHECK_FAILURE, CHECK_SUCCESS, LOGOUT, TEMP_SET_USER } from './userActions';

const initialState = {
	user: null,
	checkError: null,
};

const user = handleActions(
	{
		[TEMP_SET_USER]: (state, { payload: user }) => ({
			...state,
			user,
		}),
		[CHECK_SUCCESS]: (state, { payload: user }) => ({
			...state,
			user,
			checkError: null,
		}),
		[CHECK_FAILURE]: (state, { payload: error }) => ({
			...state,
			user: null,
			checkError: error,
		}),
		[LOGOUT]: (state) => ({
			...state,
			user: null,
		}),
	},
	initialState,
);

export default user;
