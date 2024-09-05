import { BACKEND_URL } from './endpoints';

const GOOGLE_REQUEST_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
const GOOGLE_REDIRECT_URI = BACKEND_URL + process.env.REACT_APP_OAUTH2_REDIRECT_PATH + '/google';
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const googleAuthUrl = () => {
	let url = GOOGLE_REQUEST_URL;
	url += `?client_id=${GOOGLE_CLIENT_ID}`;
	url += `&redirect_uri=${GOOGLE_REDIRECT_URI}`;
	url += `&response_type=code`;
	url += `&scope=email profile`;
	return url;
};
export const GOOGLE_AUTH_URL = googleAuthUrl();

const NAVER_REQUEST_URL = 'https://nid.naver.com/oauth2.0/authorize';
const NAVER_REDIRECT_URI = BACKEND_URL + process.env.REACT_APP_OAUTH2_REDIRECT_PATH + '/naver';
const NAVER_CLIENT_ID = process.env.REACT_APP_NAVER_CLIENT_ID;
const NAVER_STATE = process.env.REACT_APP_NAVER_STATE;
const naverAuthUrl = () => {
	let url = NAVER_REQUEST_URL;
	url += `?client_id=${NAVER_CLIENT_ID}`;
	url += `&redirect_uri=${NAVER_REDIRECT_URI}`;
	url += `&response_type=code`;
	url += `&state=${NAVER_STATE}`;
	return url;
};
export const NAVER_AUTH_URL = naverAuthUrl();
