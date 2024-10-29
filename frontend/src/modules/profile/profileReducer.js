import { handleActions } from 'redux-actions';
import {
	INITIALIZE_PROFILE,
	READ_PROFILE_FAILURE,
	READ_PROFILE_SUCCESS,
	UPDATE_PROFILE_FAILURE,
	UPDATE_PROFILE_IMAGE_FAILURE,
	UPDATE_PROFILE_IMAGE_SUCCESS,
	UPDATE_PROFILE_SUCCESS,
} from './profileTypes';

const initialState = {
	profile: null,
	updatedProfile: null,
	error: null,
};

const profile = handleActions(
	{
		[INITIALIZE_PROFILE]: (state) => initialState,
		[READ_PROFILE_SUCCESS]: (state, { payload: profile }) => ({
			...state,
			profile,
		}),
		[READ_PROFILE_FAILURE]: (state, { payload: error }) => ({
			...state,
			error,
		}),
		[UPDATE_PROFILE_SUCCESS]: (state, { payload: updatedProfile }) => ({
			...state,
			updatedProfile,
		}),
		[UPDATE_PROFILE_FAILURE]: (state, { payload: error }) => ({
			...state,
			error,
		}),
		[UPDATE_PROFILE_IMAGE_SUCCESS]: (state, { payload: updatedProfile }) => ({
			...state,
			updatedProfile,
		}),
		[UPDATE_PROFILE_IMAGE_FAILURE]: (state, { payload: error }) => ({
			...state,
			error,
		}),
	},
	initialState,
);

export default profile;
