import client from '../client';

const ARTICLE_API_BASE = '/api/article';

// 글 작성
export const write = (body) => client.post(`${ARTICLE_API_BASE}/write`, body);

// 글 단일 조회
export const getArticle = (articleId) => client.get(`${ARTICLE_API_BASE}/detail/${articleId}`);

// 본인 작성 글 조회
export const getMyArticles = ({ page, limit }) =>
	client.get(`${ARTICLE_API_BASE}/my`, { params: { page, limit } });

// 본인 작성 글 조회 by Date
export const getMyArticlesByDate = ({ year, month, day }) => {
	const dateQuery = { year, month, ...(day && { day }) };
	return client.get(`${ARTICLE_API_BASE}/my/by-date`, { params: dateQuery });
};

// 회원 작성 글 조회
export const getMemberArticles = ({ page, limit, memberId }) =>
	client.get(`${ARTICLE_API_BASE}/member/${memberId}`, {
		params: { is_public: true, page, limit },
	});

// 글 수정
export const modifyArticle = (form) => client.patch(`${ARTICLE_API_BASE}/${form.articleId}`, form);

// 글 삭제
export const deleteArticle = (articleId) => client.delete(`${ARTICLE_API_BASE}/${articleId}`);

// 전체 글 리스트 조회
export const getAllArticles = ({ page, limit }) =>
	client.get(`${ARTICLE_API_BASE}/list?page=${page}&limit=${limit}`);
