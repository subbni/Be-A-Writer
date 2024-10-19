import React from 'react';
import styled from 'styled-components';
import DefaultProfile from '../../images/Profile.svg';
import { Link } from 'react-router-dom';

const ProfileHeaderWrapper = styled.div`
	/* border: 1px solid black; */
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: start;
	align-items: center;
`;

const AuthorInfoWrapper = styled.div`
	position: relative;
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: start;
	align-items: center;
`;

const AuthorInfo = styled.div`
	margin: 0 1rem;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: start;
	.nickname {
		font-size: 1.5rem;
		padding: 0.2rem 0;
	}
`;

const ProfileImage = styled.img`
	width: 100px;
	height: 100px;
`;

const ProfileSettingBtn = styled.button`
	position: absolute;
	bottom: 0;
	right: 0;
	border: 1px solid var(--color-gray);
	border-radius: 20px;
	background-color: white;
	color: var(--color-dark-gray);
	margin: 0.5rem 0;
	font-size: 0.7rem;
	cursor: pointer;
	&:hover {
		background-color: var(--color-light-gray);
	}
`;

const ProfileHeader = ({ profile, isCurrentUser }) => {
	return (
		<ProfileHeaderWrapper>
			<AuthorInfoWrapper>
				<ProfileImage src={DefaultProfile} alt="profile image" />
				<AuthorInfo>
					<h1 className="nickname">{profile?.nickname}</h1>
					<div className="description">{profile?.bio}</div>
				</AuthorInfo>
				{isCurrentUser && (
					<ProfileSettingBtn>
						<Link to="/my/profile">수정</Link>
					</ProfileSettingBtn>
				)}
			</AuthorInfoWrapper>
		</ProfileHeaderWrapper>
	);
};

export default ProfileHeader;
