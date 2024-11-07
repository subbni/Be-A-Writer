import { handleActions } from 'redux-actions';
import {
	READ_COMMENTS_SUCCESS,
	READ_COMMENTS_FAILURE,
	WRITE_COMMENT_FAILURE,
	WRITE_COMMENT_SUCCESS,
	READ_RECOMMENTS_SUCCESS,
	READ_RECOMMENTS_FAILURE,
	MODIFY_COMMENT_SUCCESS,
	MODIFY_COMMENT_FAILURE,
	DELETE_COMMENT_SUCCESS,
	DELETE_COMMENT_FAILURE,
} from './commentActions';

const initialState = {
	comments: null,
	recomments: {},
	deletedComment: null,
	addedComment: null,
	error: null,
};

const comments = handleActions(
	{
		[READ_COMMENTS_SUCCESS]: (state, { payload: comments }) => ({
			...state,
			comments,
		}),
		[READ_COMMENTS_FAILURE]: (state, { payload: error }) => ({
			...state,
			error,
		}),
		[READ_RECOMMENTS_SUCCESS]: (state, { payload: { parentId, data } }) => ({
			...state,
			recomments: {
				...state.recomments,
				[parentId]: [...data],
			},
		}),
		[READ_RECOMMENTS_FAILURE]: (state, { payload: error }) => ({
			...state,
			error,
		}),
		[WRITE_COMMENT_SUCCESS]: (state, { payload: comment }) => ({
			...state,
			addedComment: comment,
		}),
		[WRITE_COMMENT_FAILURE]: (state, { payload: error }) => ({
			...state,
			error,
		}),
		[MODIFY_COMMENT_SUCCESS]: (state, { payload: comment }) => ({
			...state,
			addedComment: comment,
		}),
		[MODIFY_COMMENT_FAILURE]: (state, { payload: error }) => ({
			...state,
			error,
		}),
		[DELETE_COMMENT_SUCCESS]: (state, { payload: comment }) => ({
			...state,
			deletedComment: comment,
		}),
		[DELETE_COMMENT_FAILURE]: (state, { payload: error }) => ({
			...state,
			error,
		}),
	},
	initialState,
);

export default comments;
