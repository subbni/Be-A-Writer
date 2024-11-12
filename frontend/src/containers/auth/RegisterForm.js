import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, register } from '../../modules/auth/authActions';
import AuthForm from '../../components/auth/AuthForm';
import { check } from '../../modules/user/userActions';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
	const [error, setError] = useState(null);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const form = useSelector((state) => state.auth.register);
	const auth = useSelector((state) => state.auth.auth);
	const authError = useSelector((state) => state.auth.authError);
	const user = useSelector((state) => state.user.user);

	const onChange = (e) => {
		const { value, name } = e.target;
		dispatch(
			changeField({
				form: 'register',
				key: name,
				value: value,
			}),
		);
	};

	// 폼 등록
	const onSubmit = (e) => {
		e.preventDefault();
		if (validateForm()) {
			const { email, nickname, password } = form;
			dispatch(register({ email, nickname, password }));
		}
	};

	// 폼 검증
	const validateForm = () => {
		const { email, nickname, password, passwordConfirm } = form;
		if (!email || !nickname || !password || !passwordConfirm) {
			setError('모든 칸을 입력해주세요.');
			return false;
		}
		if (password !== passwordConfirm) {
			setError('비밀번호가 일치하지 않습니다.');
			return false;
		}
		return true;
	};

	// 첫 렌더링
	useEffect(() => {
		dispatch(initializeForm('register'));
		return () => dispatch(initializeForm('register'));
	}, [dispatch]);

	// 회원가입 성공/실패 처리
	useEffect(() => {
		if (authError) {
			console.log('회원가입 실패');
			setError(authError.response.data.message);
			return;
		} else {
			setError(null);
		}
		if (auth) {
			dispatch(check());
			window.alert(`${form.nickname}님의 가입을 환영합니다!`);
			navigate('/login');
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
		<AuthForm type="register" form={form} onChange={onChange} onSubmit={onSubmit} error={error} />
	);
};

export default RegisterForm;
