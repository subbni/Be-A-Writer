import { createRequestActionTypes } from '../../services/createRequestSaga';

// 조회
export const [READ_COMMENTS, READ_COMMENTS_SUCCESS, READ_COMMENTS_FAILURE] =
	createRequestActionTypes('comment/READ_COMMENTS');

// 작성
export const [WRITE_COMMENT, WRITE_COMMENT_SUCCESS, WRITE_COMMENT_FAILURE] =
	createRequestActionTypes('comment/WRITE_COMMENT');

// 수정
export const [MODIFY_COMMENT, MODIFY_COMMENT_SUCCESS, MODIFY_COMMENT_FAILURE] =
	createRequestActionTypes('comment/MODIFY_COMMENT');
