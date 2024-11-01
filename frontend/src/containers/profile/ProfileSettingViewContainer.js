import React, { useEffect, useState } from 'react';
import ProfileSettingView from '../../components/profile/ProfileSettingView';
import { useDispatch, useSelector } from 'react-redux';
import {
	initializeProfile,
	readProfile,
	updateProfile,
	updateProfileImage,
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
	const [profileImageUrl, setProfileImageUrl] = useState({});
	const [profileImageFile, setProfileImageFile] = useState(null);

	useEffect(() => {
		dispatch(readProfile(memberId));
	}, [dispatch]);

	useEffect(() => {
		return () => {
			dispatch(initializeProfile());
			if (profileImageFile) {
				URL.revokeObjectURL(profileImageUrl);
			}
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
			setProfileImageUrl(() => profile.profileImageUrl);
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
		if (profileImageFile) {
			dispatch(updateProfileImage(profileImageFile));
		}
		dispatch(updateProfile(form));
	};

	const onCancel = () => {
		navigate(-1);
	};

	const onProfileImageSet = (e) => {
		const file = e.target.files[0];
		setProfileImageFile(file);
		if (profileImageFile) {
			URL.revokeObjectURL(profileImageUrl);
		}
		setProfileImageUrl(URL.createObjectURL(file));
	};

	return (
		<ProfileSettingView
			errMsg={errMsg}
			profileImageUrl={profileImageUrl}
			form={form}
			onChange={onChange}
			onSubmit={onSubmit}
			onCancel={onCancel}
			onProfileImageSet={onProfileImageSet}
		/>
	);
};

export default ProfileSettingViewContainer;
