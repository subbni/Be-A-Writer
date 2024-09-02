import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm } from '../../modules/auth';
import AuthForm from '../auth/AuthForm';

const RegisterForm = () => {
	const dispatch = useDispatch();
	const { form } = useSelector(({ auth }) => ({
		form: auth.register,
	}));

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

	const onSubmit = (e) => {
		e.preventDefault();
		// TODO: api 요청 전송 구현
	};

	useEffect(() => {
		dispatch(initializeForm('register'));
	}, [dispatch]);

	return (
		<AuthForm
			type="register"
			form={form}
			onChange={onChange}
			onSubmit={onSubmit}
		/>
	);
};

export default RegisterForm;
