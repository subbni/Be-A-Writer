import React from 'react';
import AuthTemplate from '../components/auth/AuthTemplate';
import AuthForm from '../components/auth/AuthForm';

const LoginPage = () => {
	return (
		<AuthTemplate>
			<AuthForm type="로그인" />
		</AuthTemplate>
	);
};

export default LoginPage;
