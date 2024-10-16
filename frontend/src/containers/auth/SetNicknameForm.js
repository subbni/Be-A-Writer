import React, { useEffect, useState } from 'react';
import AuthForm from '../../components/auth/AuthForm';
import { useDispatch, useSelector } from 'react-redux';
import {
	changeField,
	getUserInfo,
	initializeForm,
	registerUserInfo,
} from '../../modules/auth/auth';
import { useNavigate } from 'react-router-dom';
import { check } from '../../modules/user/user';

const SetNicknameForm = () => {
	const [error, setError] = useState('');
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const form = useSelector((state) => state.auth.userInfo);
	const auth = useSelector((state) => state.auth.auth);
	const authError = useSelector((state) => state.auth.authError);
	const user = useSelector((state) => state.user.user);

	const onChange = (e) => {
		const { value, name } = e.target;
		dispatch(
			changeField({
				form: 'userInfo',
				key: name,
				value: value,
			}),
		);
	};

	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(registerUserInfo(form));
	};

	// inintial rendering
	useEffect(() => {
		dispatch(getUserInfo());
		return () => dispatch(initializeForm('nicknameRegister'));
	}, [dispatch]);

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
		<AuthForm
			type="nicknameRegister"
			form={form}
			error={error}
			onChange={onChange}
			onSubmit={onSubmit}
		/>
	);
};

export default SetNicknameForm;
