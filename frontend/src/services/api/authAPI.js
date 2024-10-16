import client from './client';

// 로그인
export const login = ({ email, password }) => client.post('/api/auth/login', { email, password });

// 회원가입
export const register = ({ email, nickname, password }) =>
	client.post('/api/auth/register', { email, nickname, password });

// 로그인 상태 확인
export const check = () => client.get('/api/auth/check');

// 로그아웃
export const logout = () => client.post('/api/auth/logout');

// userInfo 요청
export const getUserInfo = () => client.get('/api/oauth/userinfo');

// userInfo 등록 요청
export const registerUserInfo = (userInfo) => client.post('/api/oauth/register', userInfo);
