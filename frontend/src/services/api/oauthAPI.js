import client from '../client';

const OAUTH_API_BASE = '/api/oauth';

// userInfo 요청
export const getUserInfo = () => client.get(`${OAUTH_API_BASE}/userinfo`);

// userInfo 등록 요청
export const registerUserInfo = (userInfo) => client.post(`${OAUTH_API_BASE}/register`, userInfo);
