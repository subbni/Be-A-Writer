import { createAction } from 'redux-actions';
import {
	DELETE_COMMENT,
	MODIFY_COMMENT,
	READ_COMMENTS,
	READ_RECOMMENTS,
	WRITE_COMMENT,
} from './commentTypes';

export const readComments = createAction(READ_COMMENTS, (id) => id);
export const writeComment = createAction(WRITE_COMMENT, (form) => form);
export const readRecomments = createAction(READ_RECOMMENTS, (id) => id);
export const modifyComment = createAction(MODIFY_COMMENT, (form) => form);
export const deleteComment = createAction(DELETE_COMMENT, (id) => id);
