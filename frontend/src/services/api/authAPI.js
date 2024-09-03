import client from './client';

// 로그인
export const login = ({ email, password }) => {
	return client.post('/api/auth/login', { email, password });
};

// 회원가입
export const register = ({ email, nickname, password }) => {
	return client.post('/api/auth/register', { email, nickname, password });
};

// 로그인 상태 확인
export const check = () => {
	return client.get('/api/auth/check');
};
