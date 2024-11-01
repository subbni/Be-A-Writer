import React from 'react';
import { useSelector } from 'react-redux';
import MainPageView from '../../components/main/MainPageView';

const MainPageContainer = () => {
	const user = useSelector((state) => state.user.user);
	return <MainPageView user={user} />;
};

export default MainPageContainer;
