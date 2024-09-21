import client from './client';

// 글 작성
export const write = ({ title, subtitle, content }) =>
	client.post('/api/article/write', { title, subtitle, content });

// 글 단일 조회
export const getArticle = (articleId) => client.get(`/api/article/detail/${articleId}`);

// 본인 작성 글 조회
export const getMyArticles = ({ page, limit }) =>
	client.get(`/api/article/my?page=${page}&limit=${limit}`);

// 글 수정
export const modifyArticle = ({ articleId, title, subtitle, content }) =>
	client.patch(`/api/article/${articleId}`, { articleId, title, subtitle, content });

// 글 삭제
export const deleteArticle = (articleId) => client.delete(`/api/article/${articleId}`);
