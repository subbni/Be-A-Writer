import AuthErrorMessage from '../../constants/error/authErrorMessage.js';

const oauth2ErrorHandler = async (err, req, res, next) => {
	// 닉네임 설정 필요한 경우
	const userInfo = req.userInfo;
	if (
		err.message === AuthErrorMessage.NICKNAME_REQUIRED.message ||
		err.message === AuthErrorMessage.DUPLICATED_NICKNAME.message
	) {
		res.cookie('userInfo', JSON.stringify(userInfo), {
			httpOnly: true,
			maxAge: 10 * 60 * 1000, // 10분 후 만료
		});
		res.cookie(
			'errorMessage',
			JSON.stringify({
				message: err.message,
				status: err.status || 500,
			}),
			{
				httpOnly: true,
				maxAge: 10 * 60 * 1000,
			},
		);
		return res.redirect(`${process.env.OAUTH_REDIRECT_URI}/nickname`);
	} else {
		// 기타 에러
		return res.redirect(
			`${process.env.OAUTH_REDIRECT_URI}?error=${encodeURIComponent(
				e.message,
			)}`,
		);
	}
};

export default oauth2ErrorHandler;
