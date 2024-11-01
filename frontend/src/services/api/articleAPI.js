import client from './client';

const API_BASE = '/api/article';

// 글 작성
export const write = (body) => client.post(`${API_BASE}/write`, body);

// 글 단일 조회
export const getArticle = (articleId) => client.get(`${API_BASE}/detail/${articleId}`);

// 본인 작성 글 조회
export const getMyArticles = ({ page, limit }) =>
	client.get(`${API_BASE}/my?page=${page}&limit=${limit}`);

// 본인 작성 글 조회 by Date
export const getMyArticlesByDate = ({ year, month, day = null }) =>
	day === null
		? client.get(`${API_BASE}/my/by-date?year=${year}&month=${month}`)
		: client.get(`${API_BASE}/my/by-date?year=${year}&month=${month}&day=${day}`);

// 회원 작성 글 조회
export const getUserArticles = ({ page, limit, memberId }) =>
	client.get(`${API_BASE}/member/${memberId}?is_public=true&page=${page}&limit=${limit}`);

// 글 수정
export const modifyArticle = (body) => client.patch(`${API_BASE}/${body.articleId}`, body);

// 글 삭제
export const deleteArticle = (articleId) => client.delete(`${API_BASE}/${articleId}`);

// 전체 글 리스트 조회
export const getAllArticles = ({ page, limit }) =>
	client.get(`${API_BASE}/list?page=${page}&limit=${limit}`);
