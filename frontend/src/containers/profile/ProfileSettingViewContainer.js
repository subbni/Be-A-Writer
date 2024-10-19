import React, { useEffect, useState } from 'react';
import ProfileSettingView from '../../components/profile/ProfileSettingView';
import { useDispatch, useSelector } from 'react-redux';
import {
	initializeProfile,
	readProfile,
	updateProfile,
} from '../../modules/profile/profileActions';
import { useNavigate } from 'react-router-dom';

const ProfileSettingViewContainer = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const memberId = useSelector((state) => state.user.user.member_id);
	const profile = useSelector((state) => state.profile.profile);
	const updatedProfile = useSelector((state) => state.profile.updatedProfile);
	const error = useSelector((state) => state.profile.error);

	const [errMsg, setErrMsg] = useState('');
	const [form, setForm] = useState({});

	useEffect(() => {
		dispatch(readProfile(memberId));
	}, [dispatch]);

	useEffect(() => {
		return () => {
			dispatch(initializeProfile());
		};
	}, []);

	useEffect(() => {
		if (profile) {
			setForm({
				memberId,
				email: profile.email,
				nickname: profile.nickname,
				bio: profile.bio || '',
			});
		}
	}, [profile]);

	useEffect(() => {
		if (error) {
			setErrMsg(error.response.data.message);
		}
		if (updatedProfile) {
			window.alert('프로필이 수정되었습니다!');
			navigate(`/${memberId}`);
		}
	}, [updatedProfile, error]);

	const onChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};

	const onSubmit = (form) => {
		dispatch(updateProfile(form));
	};

	const onCancel = () => {
		navigate(-1);
	};

	return (
		<ProfileSettingView
			errMsg={errMsg}
			form={form}
			onChange={onChange}
			onSubmit={onSubmit}
			onCancel={onCancel}
		/>
	);
};

export default ProfileSettingViewContainer;
