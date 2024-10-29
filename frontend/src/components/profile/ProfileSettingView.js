import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import DefaultProfile from '../../images/Profile.svg';
import FileUploader from '../common/FileUploader';

const ProfileSettingViewBlock = styled(Responsive)`
	/* border: 1px solid black; */
	padding: 10rem;
	padding-bottom: 5rem;
	max-width: 1000px;
	min-width: 700px;
`;

const ProfileImageSettingForm = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const ProfileSettingForm = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const ProfileImage = styled.img`
	width: 150px;
	height: 150px;
	margin-bottom: 2rem;
	border-radius: 150px;
`;

const ProfileSettingItem = styled.div`
	width: 100%;
	label {
		display: block;
		font-size: 0.5rem;
		span {
			color: var(--color-point);
			margin-right: 5px;
		}
	}
`;

const ProfileInfoItem = styled(ProfileSettingItem)``;

const StyledInput = styled.input`
	width: 100%;
	height: 2rem;
	border: none;
	border-bottom: 1px solid var(--color-gray);
	outline: none;
	margin: 0.5rem 0 1rem 0;
	font-size: 1rem;
	&:focus {
		color: var(--color-dark);
		border-bottom: 2px solid var(--color-gray);
	}
	&:-webkit-autofill {
		-webkit-box-shadow: 0 0 0 1000px white inset;
		-webkit-text-fill-color: var(--color-black);
	}
`;

const ErrorMessage = styled.div`
	color: var(--color-point);
	width: 100%;
	text-align: center;
	margin: 1rem 0;
	font-size: 0.8rem;
`;

const BtnWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: end;
	align-items: center;
	margin: 2rem 0;
`;

const StyledBtn = styled.button`
	width: 60px;
	height: 30px;
	border: 1px solid var(--color-gray);
	border-radius: 5px;
	background-color: white;
	color: var(--color-dark-gray);
	margin-left: 0.5rem;
	&:hover {
		cursor: pointer;
		background-color: var(--color-light-gray);
	}
`;

const FileUploadBtn = styled.div`
	font-size: 12px;
	color: var(--color-dark-gray);
	cursor: pointer;
	padding: 0.5rem;
	border: 1px solid var(--color-gray);
	border-radius: 25px;
`;

const ProfileSettingView = ({
	errMsg,
	form,
	profileImageUrl,
	onChange,
	onCancel,
	onSubmit,
	onProfileImageSet,
}) => {
	const onFormSubmit = (e) => {
		e.preventDefault();
		onSubmit(form);
	};

	return (
		<ProfileSettingViewBlock>
			<ProfileImageSettingForm>
				<ProfileImage src={profileImageUrl || DefaultProfile} alt="profile image" />
				<FileUploader btnText="이미지 업로드" onFileSet={onProfileImageSet} />
			</ProfileImageSettingForm>
			<ProfileSettingForm onSubmit={onFormSubmit}>
				<ProfileInfoItem>
					<label htmlFor="email">
						<span>*</span>이메일
					</label>
					<StyledInput type="text" name="email" value={form?.email} disabled />
				</ProfileInfoItem>
				<ProfileSettingItem>
					<label htmlFor="nickname">
						<span>*</span>닉네임
					</label>
					<StyledInput
						type="text"
						name="nickname"
						value={form?.nickname || ''}
						onChange={onChange}
						required
					/>
				</ProfileSettingItem>
				<ProfileSettingItem>
					<label htmlFor="bio">
						<span>*</span>소개
					</label>
					<StyledInput type="text" name="bio" value={form?.bio || ''} onChange={onChange} />
				</ProfileSettingItem>
				<ErrorMessage>{errMsg}</ErrorMessage>
				<BtnWrapper>
					<StyledBtn type="button" onClick={onCancel}>
						취소
					</StyledBtn>
					<StyledBtn type="submit">저장</StyledBtn>
				</BtnWrapper>
			</ProfileSettingForm>
		</ProfileSettingViewBlock>
	);
};

export default ProfileSettingView;
