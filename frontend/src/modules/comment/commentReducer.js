import { handleActions } from 'redux-actions';
import {
	READ_COMMENTS_SUCCESS,
	READ_COMMENTS_FAILURE,
	WRITE_COMMENT_FAILURE,
	WRITE_COMMENT_SUCCESS,
} from './commentTypes';

const initialState = {
	comments: null,
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
		[WRITE_COMMENT_SUCCESS]: (state, { payload: comment }) => ({
			...state,
			addedComment: comment,
		}),
		[WRITE_COMMENT_FAILURE]: (state, { payload: error }) => ({
			...state,
			error,
		}),
	},
	initialState,
);

export default comments;
