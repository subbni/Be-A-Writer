import client from './client';

// 글 작성
export const write = (body) => client.post('/api/article/write', body);

// 글 단일 조회
export const getArticle = (articleId) => client.get(`/api/article/detail/${articleId}`);

// 본인 작성 글 조회
export const getMyArticles = ({ page, limit }) =>
	client.get(`/api/article/my?page=${page}&limit=${limit}`);

// 본인 작성 글 조회 by Date
export const getMyArticlesByDate = ({ year, month, day = null }) =>
	day === null
		? client.get(`api/article/my/by-date?year=${year}&month=${month}`)
		: client.get(`api/article/my/by-date?year=${year}&month=${month}&day=${day}`);

// 글 수정
export const modifyArticle = (body) => client.patch(`/api/article/${body.articleId}`, body);

// 글 삭제
export const deleteArticle = (articleId) => client.delete(`/api/article/${articleId}`);

// 전체 글 리스트 조회
export const getAllArticles = ({ page, limit }) =>
	client.get(`/api/article/list?page=${page}&limit=${limit}`);
