import React, { useEffect, useState } from 'react';
import ProfileView from '../../components/profile/ProfileView';
import ProfileHeader from '../../components/profile/ProfileHeader';
import ProfileTab from '../../components/profile/ProfileTab';
import ProfileTabContent from '../../components/profile/ProfileTabContent';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { initializeProfile, readProfile } from '../../modules/profile/profileActions';
import { readUserArticles, unloadArticles } from '../../modules/article/articles/articlesActions';
import ProfileArticlesContent from '../../components/profile/ProfileArticlesContent';

const ProfileViewContainer = () => {
	const { memberId } = useParams();
	const dispatch = useDispatch();
	const profile = useSelector((state) => state.profile.profile);
	const currentUserId = useSelector((state) => state.user.user.member_id);
	const articles = useSelector((state) => state.articles.articles);
	const articlesLoading = useSelector((state) => state.loading['articles/READ_USER_ARTICLES']);
	const [clickedTab, setClickedTab] = useState(1);
	const [page, setPage] = useState(1);

	const tabs = ['작가 소개', '작성글', '작품'];

	useEffect(() => {
		dispatch(readProfile(memberId));

		return () => {
			dispatch(initializeProfile());
			dispatch(unloadArticles());
		};
	}, [dispatch, memberId]);

	const onTabClick = (tabNumber) => {
		setClickedTab(tabNumber);
	};

	useEffect(() => {
		if (clickedTab === 1) {
			dispatch(readUserArticles({ memberId, page, limit: 10 }));
		}
	}, [clickedTab, page]);

	const onInfiniteScroll = () => {
		setPage((prev) => prev + 1);
	};

	return (
		<ProfileView>
			<ProfileHeader profile={profile} isCurrentUser={memberId == currentUserId} />
			<ProfileTab tabs={tabs} clickedTab={clickedTab} onTabClick={onTabClick} />
			{clickedTab === 1 && (
				<ProfileArticlesContent
					articles={articles}
					onInfiniteScroll={onInfiniteScroll}
					articlesLoading={articlesLoading}
				/>
			)}
			{/* <ProfileTabContent>
			{clickedTab === 1 && <ArticleList articles={articles} />}
			</ProfileTabContent> */}
		</ProfileView>
	);
};

export default ProfileViewContainer;
