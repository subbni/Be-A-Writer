import client from './client';

// 글 작성
export const write = ({ title, subtitle, content }) =>
	client.post('/api/article/write', { title, subtitle, content });
