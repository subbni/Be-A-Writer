import client from '../client';

const COMMENT_API_BASE = '/api/comment';

// 댓글 작성
export const write = (body) => client.post(`${COMMENT_API_BASE}/write`, body);

// 댓글 조회 by article
export const getComments = ({ articleId, page, limit }) =>
	client.get(`${COMMENT_API_BASE}/${articleId}`, { params: { page, limit } });

// 대댓글 조회
export const getRecomments = (commentId) => client.get(`${COMMENT_API_BASE}/reply/${commentId}`);

// 댓글 수정
export const updateComment = ({ commentId, content }) =>
	client.patch(`${COMMENT_API_BASE}/${commentId}`, { content });

// 댓글 삭제
export const deleteComment = (commentId) => client.delete(`${COMMENT_API_BASE}/${commentId}`);
