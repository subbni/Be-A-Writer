import jwt from 'jsonwebtoken';

/**
 * JWT 토큰을 발행하는 함수
 * @param {Object} payload
 * @returns {String} - 생성된 JWT 토큰
 */
export function generateToken(payload) {
	return jwt.sign(payload, process.env.JWT_SECRET, {
		expiresIn: '7d', // 7일
	});
}

/**
 * Access Token을 HTTP Response 쿠키에 설정하는 함수
 * @param {Object} res - Express 응답 객체
 * @param {String} token - 설정할 JWT 토큰
 */
export function setTokenCookie(res, token) {
	res.cookie('access_token', token, {
		maxAge: 1000 * 60 * 60 * 24 * 7,
		httpOnly: true,
	});
}

/**
 * 쿠키에서 Access Token을 제거하는 함수
 * @param {Object} res - Express 요청 객체
 * @param {Object} res - Express 응답 객체
 */
export function clearTokenCookie(req, res) {
	res.clearCookie('access_token', req.cookies.access_token, {
		httpOnly: true,
	});
}
