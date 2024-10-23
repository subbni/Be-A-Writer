import React, { useEffect } from 'react';
import ProfileView from '../../components/profile/ProfileView';
import ProfileHeader from '../../components/profile/ProfileHeader';
import ProfileTab from '../../components/profile/ProfileTab';
import ProfileTabContent from '../../components/profile/ProfileTabContent';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { initializeProfile, readProfile } from '../../modules/profile/profileActions';

const ProfileViewContainer = () => {
	const { memberId } = useParams();
	const dispatch = useDispatch();
	const profile = useSelector((state) => state.profile.profile);
	const currentUserId = useSelector((state) => state.user.user.member_id);

	useEffect(() => {
		dispatch(readProfile(memberId));

		return () => dispatch(initializeProfile());
	}, [dispatch, memberId]);

	return (
		<ProfileView>
			<ProfileHeader profile={profile} isCurrentUser={memberId == currentUserId} />
			<ProfileTab />
			<ProfileTabContent />
		</ProfileView>
	);
};

export default ProfileViewContainer;
