import React from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import ProfileHeader from './ProfileHeader';
import ProfileTab from './ProfileTab';

const ProfileViewBlock = styled(Responsive)`
	/* border: 1px solid black; */
	padding: 10rem;
	padding-bottom: 5rem;
	max-width: 1300px;
	min-width: 700px;
`;

const ProfileView = ({ children }) => {
	return <ProfileViewBlock>{children}</ProfileViewBlock>;
};

export default ProfileView;
