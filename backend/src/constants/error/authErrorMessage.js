const AuthErrorMessage = {
	DUPLICATED_EMAIL: {
		message: '해당 이메일로 가입된 계정이 이미 존재합니다.',
		status: 409,
	},
	EMAIL_NOT_FOUND: {
		message: '해당 이메일로 가입된 계정이 없습니다.',
		status: 404,
	},
	INVALID_PASSWORD: { message: '비밀번호가 일치하지 않습니다.', status: 401 },
};

export default AuthErrorMessage;
