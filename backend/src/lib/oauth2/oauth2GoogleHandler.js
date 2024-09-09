import AuthProvider, { mapAuthProvider } from '../../constants/authProvider.js';
import axios from 'axios';

const oauth2GoogleHandler = async (req, res) => {
	const { code } = req.query;
	// 1. code로 access_token 얻어오기
	const tokenData = await requestGoogleAccessToken(code);
	// 2. access_token으로 userInfo 얻어오기
	const userInfo = await requestGoogleUserinfo(tokenData);
	req.userInfo = {
		email: userInfo.email,
		nickname: userInfo.name,
		password: '',
		authProvider: AuthProvider.GOOGLE,
	};
};

const requestGoogleAccessToken = async (code) => {
	try {
		const res = await axios.post(process.env.GOOGLE_TOKEN_URL, {
			code: code,
			client_id: process.env.GOOGLE_CLIENT_ID,
			client_secret: process.env.GOOGLE_CLIENT_SECRET,
			redirect_uri: process.env.GOOGLE_REDIRECT_URI,
			grant_type: 'authorization_code',
		});
		return res.data;
	} catch (e) {
		console.log(e.message);
		throw new Error('Failed to request access token');
	}
};

const requestGoogleUserinfo = async (data) => {
	try {
		const res = await axios.get(process.env.GOOGLE_USERINFO_URL, {
			headers: {
				Authorization: `Bearer ${data.access_token}`,
			},
		});
		return res.data;
	} catch (e) {
		console.log(e.message);
		throw new Error('Failed to request user info');
	}
};

export default oauth2GoogleHandler;
