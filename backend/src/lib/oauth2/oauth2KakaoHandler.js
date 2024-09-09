import AuthProvider, { mapAuthProvider } from '../../constants/authProvider.js';
import axios from 'axios';
import qs from 'querystring';

const oauth2KakaoHandler = async (req, res) => {
	const { code } = req.query;
	// 1. code로 access_token 얻어오기
	const tokenData = await requestKakaoAccessToken(code);
	// 2. access_token으로 userInfo 얻어오기
	const userInfo = await requestKakaoUserinfo(tokenData);
	req.userInfo = {
		email: userInfo.email,
		nickname: userInfo.nickname, //TODO: kakao의 경우 nickname이 없는 경우 존재
		password: '',
		authProvider: AuthProvider.KAKAO,
	};
};

const requestKakaoAccessToken = async (code) => {
	try {
		const res = await axios.post(
			process.env.KAKAO_TOKEN_URL,
			qs.stringify({
				// Kakao의 경우 application/x-www-form-urlencoded 형식으로 전송 필요
				code: code,
				redirect_uri: process.env.KAKAO_REDIRECT_URI,
				client_id: process.env.KAKAO_CLIENT_ID,
				grant_type: 'authorization_code',
			}),
		);
		return res.data;
	} catch (e) {
		console.log(e.message);
		throw new Error('Failed to request access token');
	}
};

const requestKakaoUserinfo = async (data) => {
	try {
		const res = await axios.get(process.env.KAKAO_USERINFO_URL, {
			headers: {
				Authorization: `Bearer ${data.access_token}`,
				'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
			},
		});
		return res.data.kakao_account; // Kakao의 유저 정보는 res.data.kakao_account에 담겨있음.
	} catch (e) {
		console.log(e.message);
		throw new Error('Failed to request user info');
	}
};

export default oauth2KakaoHandler;
