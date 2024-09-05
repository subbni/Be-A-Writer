import AuthProvider, { mapAuthProvider } from '../constants/authProvider.js';
import axios from 'axios';
import qs from 'querystring';

const oauth2NaverHandler = async (req, res) => {
	const { code, state } = req.query;
	// 1. code,state로 access_token 얻어오기
	const tokenData = await requestNaverAccessToken(code, state);
	// 2. access_token으로 userInfo 얻어오기
	const userInfo = await requestNaverUserinfo(tokenData);
	req.userInfo = {
		email: userInfo.email,
		nickname: userInfo.nickname,
		password: '',
		authProvider: AuthProvider.NAVER,
	};
};

const requestNaverAccessToken = async (code, state) => {
	try {
		const res = await axios.post(
			process.env.NAVER_TOKEN_URL,
			qs.stringify({
				// Naver의 경우 application/x-www-form-urlencoded 형식으로 전송 필요
				code: code,
				state: state,
				client_id: process.env.NAVER_CLIENT_ID,
				client_secret: process.env.NAVER_CLIENT_SECRET,
				grant_type: 'authorization_code',
			}),
		);
		return res.data;
	} catch (e) {
		console.log(e.message);
		throw new Error('Failed to request access token');
	}
};

const requestNaverUserinfo = async (data) => {
	console.log(data);
	try {
		const res = await axios.get(process.env.NAVER_USERINFO_URL, {
			headers: {
				Authorization: `Bearer ${data.access_token}`,
			},
		});
		return res.data.response; // Naver의 유저 정보는 res.data.response에 담겨있음.
	} catch (e) {
		console.log(e.message);
		throw new Error('Failed to request user info');
	}
};

export default oauth2NaverHandler;
