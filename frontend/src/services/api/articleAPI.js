import client from './client';

// 글 작성
export const write = ({ title, subtitle, content }) =>
	client.post('/api/article/write', { title, subtitle, content });

// 글 단일 조회
export const getArticle = (articleId) => client.get(`/api/article/detail/${articleId}`);

// 본인 작성 글 조회
export const getMyArticles = () => client.get('/api/article/my');
