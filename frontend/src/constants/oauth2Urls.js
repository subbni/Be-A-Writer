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
