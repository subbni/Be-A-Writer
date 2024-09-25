import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, login } from '../../modules/auth/auth';
import AuthForm from '../../components/auth/AuthForm';
import { useNavigate } from 'react-router-dom';
import { check } from '../../modules/user/user';
// const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
// 	form: auth.login,
// 	auth: auth.auth,
// 	authError: auth.authError,
// 	user: user.user,
// }));
const LoginForm = () => {
	const [error, setError] = useState(null);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const form = useSelector((state) => state.auth.login);
	const auth = useSelector((state) => state.auth.auth);
	const authError = useSelector((state) => state.auth.authError);
	const user = useSelector((state) => state.user.user);

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
			dispatch(check());
		}
	}, [auth, authError, dispatch]);

	useEffect(() => {
		if (user) {
			navigate('/');
			try {
				localStorage.setItem('user', JSON.stringify(user));
			} catch (e) {
				console.log('localStorage is not working');
			}
		}
	}, [user, navigate]);

	return (
		<AuthForm type="login" form={form} onChange={onChange} onSubmit={onSubmit} error={error} />
	);
};

export default LoginForm;
