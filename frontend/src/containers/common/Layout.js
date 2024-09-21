import React, { useEffect, useState } from 'react';
import Header from '../../components/common/Header';
import Sidebar from '../../components/common/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../modules/user/user';
import Responsive from '../../components/common/Responsive';
import { Outlet } from 'react-router-dom';

const Layout = () => {
	const [isSidebarClosed, setIsSidebarClosed] = useState(true);
	const user = useSelector((state) => state.user.user);

	const dispatch = useDispatch();
	const onLogout = () => {
		dispatch(logout());
	};
	const onMenuBtnClick = () => {
		setIsSidebarClosed((isSidebarClosed) => !isSidebarClosed);
	};

	return (
		<>
			<Header user={user} onLogout={onLogout} onMenuBtnClick={onMenuBtnClick} />
			<Sidebar isSidebarClosed={isSidebarClosed} onMenuBtnClick={onMenuBtnClick} />
			<Outlet />
		</>
	);
};

export default Layout;
