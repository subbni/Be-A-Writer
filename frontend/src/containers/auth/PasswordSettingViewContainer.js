import React, { useEffect, useState } from 'react';
import PasswordSettingView from '../../components/auth/PasswordSettingView';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { initializeForm, updatePassword } from '../../modules/auth/authActions';
import { logout } from '../../modules/user/userActions';

const PasswordSettingViewContainer = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const error = useSelector((state) => state.auth.authError);
	const successMsg = useSelector((state) => state.auth.password.message);

	const [errMsg, setErrMsg] = useState('');
	const [form, setForm] = useState({
		currentPassword: '',
		newPassword: '',
		newPasswordConfirm: '',
	});

	useEffect(() => {
		return () => dispatch(initializeForm('password'));
	}, []);

	useEffect(() => {
		if (error) {
			setErrMsg(error.response.data.message);
		}
		if (successMsg) {
			window.alert(successMsg + ' 로그인 창으로 이동합니다.');
			dispatch(logout());
			navigate('/login');
		}
	}, [error, successMsg]);

	useEffect(() => {
		if (form.newPassword !== form.newPasswordConfirm) {
			setErrMsg('새 비밀번호와 확인이 일치하지 않습니다.');
		} else {
			setErrMsg('');
		}
	}, [form.newPassword, form.newPasswordConfirm]);

	const onChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
		if (e.target.name === 'newPasswordConfirm') {
			if (e.target.value !== form['newPassword']) {
				setErrMsg('새 비밀번호와 확인이 일치하지 않습니다.');
			}
		}
	};

	const onCancel = () => {
		navigate(-1);
	};

	const onSubmit = (form) => {
		dispatch(updatePassword(form));
	};

	return (
		<PasswordSettingView
			errMsg={errMsg}
			form={form}
			onChange={onChange}
			onCancel={onCancel}
			onSubmit={onSubmit}
		/>
	);
};

export default PasswordSettingViewContainer;
