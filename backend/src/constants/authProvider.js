const AuthProvider = {
	LOCAL: 'LOCAL',
	GOOGLE: 'GOOGLE',
	NAVER: 'NAVER',
	KAKAO: 'KAKAO',
};

export function mapAuthProvider(provider) {
	switch (provider) {
		case 'local':
			return AuthProvider.LOCAL;
		case 'google':
			return AuthProvider.GOOGLE;
		case 'naver':
			return AuthProvider.NAVER;
		case 'kakao':
			return AuthProvider.KAKAO;
		default:
			throw new Error('Unknown provider');
	}
}

export default AuthProvider;
