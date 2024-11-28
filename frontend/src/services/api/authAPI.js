import client from '../client';

const AUTH_API_BASE = '/api/auth';

// 로그인
export const login = ({ email, password }) =>
	client.post(`${AUTH_API_BASE}/login`, { email, password });

// 회원가입
export const register = ({ email, nickname, password }) =>
	client.post(`${AUTH_API_BASE}/register`, { email, nickname, password });

// 로그인 상태 확인
export const check = () => client.get(`${AUTH_API_BASE}/check`);

// 로그아웃
export const logout = () => client.post(`${AUTH_API_BASE}/logout`);

// 비밀번호 수정
export const updatePassword = (form) => client.patch(`${AUTH_API_BASE}/password`, form);
