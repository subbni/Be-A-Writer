import jwt from 'jsonwebtoken';

const jwtMiddleware = async (req, res, next) => {
	const token = req.cookies.accessToken;
	req.state = req.state || {};

	if (!token) {
		return next();
	}

	try {
		// 토큰 검증
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		req.state.member = {
			memberId: decoded.memberId,
			email: decoded.email,
			nickname: decoded.nickname,
			profileImageUrl: decoded.profileImageUrl,
		};
		// TODO : 만료 기간이 기준일 미만이라면 재발급 처리
	} catch (e) {
		// 검증 실패
	}
	next();
};

export default jwtMiddleware;
