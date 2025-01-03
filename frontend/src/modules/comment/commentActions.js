import { createAction } from 'redux-actions';
import { createRequestActionTypes } from '../../services/createRequestSaga';

// 댓글 조회
export const [READ_COMMENTS, READ_COMMENTS_SUCCESS, READ_COMMENTS_FAILURE] =
	createRequestActionTypes('comment/READ_COMMENTS');

// 대댓글 조회
export const [READ_RECOMMENTS, READ_RECOMMENTS_SUCCESS, READ_RECOMMENTS_FAILURE] =
	createRequestActionTypes('comment/READ_RECOMMENTS');

// 작성
export const [WRITE_COMMENT, WRITE_COMMENT_SUCCESS, WRITE_COMMENT_FAILURE] =
	createRequestActionTypes('comment/WRITE_COMMENT');

// 수정
export const [MODIFY_COMMENT, MODIFY_COMMENT_SUCCESS, MODIFY_COMMENT_FAILURE] =
	createRequestActionTypes('comment/MODIFY_COMMENT');

// 삭제
export const [DELETE_COMMENT, DELETE_COMMENT_SUCCESS, DELETE_COMMENT_FAILURE] =
	createRequestActionTypes('comment/DELETE_COMMENT');

export const readComments = createAction(READ_COMMENTS, (id) => id);
export const writeComment = createAction(WRITE_COMMENT, (form) => form);
export const readRecomments = createAction(READ_RECOMMENTS, (id) => id);
export const modifyComment = createAction(MODIFY_COMMENT, (form) => form);
export const deleteComment = createAction(DELETE_COMMENT, (id) => id);
