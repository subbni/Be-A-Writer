import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, login } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';

const LoginForm = () => {
	const [error, setError] = useState(null);
	const dispatch = useDispatch();
	const { form, auth, authError } = useSelector(({ auth }) => ({
		form: auth.login,
		auth: auth.auth,
		authError: auth.authError,
	}));

	const onChange = (e) => {
		const { value, name } = e.target;
		dispatch(
			changeField({
				form: 'login',
				key: name,
				value: value,
			}),
		);
	};

	const onSubmit = (e) => {
		e.preventDefault();
		const { email, password } = form;
		dispatch(login({ email, password }));
	};

	useEffect(() => {
		dispatch(initializeForm('login'));
	}, [dispatch]);

	useEffect(() => {
		if (authError) {
			console.log('로그인 실패');
			setError(authError.response.data.message);
			return;
		} else {
			setError(null);
		}
		if (auth) {
			console.log('로그인 성공');
			console.log(auth);
		}
	}, [auth, authError]);

	return (
		<AuthForm type="login" form={form} onChange={onChange} onSubmit={onSubmit} error={error} />
	);
};

export default LoginForm;
