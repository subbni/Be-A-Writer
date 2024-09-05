import AuthProvider, { mapAuthProvider } from '../constants/authProvider.js';
import oauth2GoogleHandler from './oauth2GoogleHandler.js';
import oauth2NaverHandler from './oauth2NaverHandler.js';

const oauth2Middleware = async (req, res, next) => {
	const { provider } = req.params;
	console.log(provider);
	try {
		switch (mapAuthProvider(provider)) {
			case AuthProvider.GOOGLE:
				await oauth2GoogleHandler(req, res);
				return next();
			case AuthProvider.NAVER:
				await oauth2NaverHandler(req, res);
				return next();
			case AuthProvider.KAKAO:
				return next();
			default:
				throw Error('unknown provider');
		}
	} catch (e) {
		return res.redirect(
			`${process.env.OAUTH_REDIRECT_URI}?error=${encodeURIComponent(
				e.message,
			)}`,
		);
	}
};

export default oauth2Middleware;
