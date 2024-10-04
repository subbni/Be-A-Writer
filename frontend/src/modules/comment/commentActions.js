import { createAction } from 'redux-actions';
import { READ_COMMENTS, WRITE_COMMENT } from './commentTypes';

export const readComments = createAction(READ_COMMENTS, (id) => id);
export const writeComment = createAction(WRITE_COMMENT, (form) => form);
