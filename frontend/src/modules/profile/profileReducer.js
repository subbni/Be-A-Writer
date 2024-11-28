import { handleActions } from 'redux-actions';
import {
	INITIALIZE_PROFILE,
	READ_MEMBER_ARTICLES_FAILURE,
	READ_MEMBER_ARTICLES_SUCCESS,
	READ_PROFILE_FAILURE,
	READ_PROFILE_SUCCESS,
	UNLOAD_ARTICLES,
	UPDATE_PROFILE_FAILURE,
	UPDATE_PROFILE_IMAGE_FAILURE,
	UPDATE_PROFILE_IMAGE_SUCCESS,
	UPDATE_PROFILE_SUCCESS,
} from './profileActions';

const initialState = {
	profile: null,
	articles: {
		totalCount: null,
		count: null,
		data: [],
	},
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
		[READ_MEMBER_ARTICLES_SUCCESS]: (state, { payload: newArticles }) => ({
			...state,
			articles: {
				totalCount: newArticles.totalCount,
				count: state.articles.count + newArticles.count,
				data: [...state.articles.data, ...newArticles.data],
			},
		}),
		[READ_MEMBER_ARTICLES_FAILURE]: (state, { payload: error }) => ({
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
		[UNLOAD_ARTICLES]: (state) => ({
			...state,
			articles: {
				totalCount: null,
				count: null,
				data: [],
			},
		}),
	},
	initialState,
);

export default profile;
