import client from './client';

// 댓글 작성
export const write = (body) => {
	console.log(body);
	return client.post('/api/comment/write', body);
};

// 댓글 조회 by article
export const getComments = ({ articleId, page, limit }) =>
	client.get(`/api/comment/${articleId}?page=${page}&limit=${limit}}`);

// 대댓글 조회
export const getRecomments = (commentId) => client.get(`/api/comment/reply/${commentId}`);

// 댓글 수정
export const updateComment = ({ commentId, content }) =>
	client.patch(`/api/comment/${commentId}`, {
		content: content,
	});

// 댓글 삭제
export const deleteComment = (commentId) => client.delete(`/api/comment/${commentId}`);
