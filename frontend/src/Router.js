import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MainPage from './pages/MainPage';
import OAuth2RedirectHandler from './containers/auth/OAuth2RedirectHanlder';
import WritePage from './pages/WritePage';
import ArticlePage from './pages/ArticlePage';
import Layout from './containers/common/Layout';
import MyArticlesPage from './pages/MyArticlesPage';
import FullArticlesPage from './pages/FullArticlesPage';
import CalendarPage from './pages/CalendarPage';
import SetNicknameForm from './containers/auth/SetNicknameForm';
import NicknameSettingPage from './pages/NicknameSettingPage';
import ProfilePage from './pages/ProfilePage';
import ProfileSettingPage from './pages/ProfileSettingPage';
import PasswordSettingPage from './pages/PasswordSettingPage';

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<Layout />}>
					<Route path="/" element={<MainPage />} />
					<Route path="articles" element={<FullArticlesPage />} />
					<Route path="article/write" element={<WritePage />} />
					<Route path="article/:articleId" element={<ArticlePage />} />
					<Route path="profile/:memberId" element={<ProfilePage />} />
					<Route path="my/calendar" element={<CalendarPage />} />
					<Route path="my/articles" element={<MyArticlesPage />} />
					<Route path="my/profile" element={<ProfileSettingPage />} />
					<Route path="my/password" element={<PasswordSettingPage />} />
				</Route>
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
				<Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
				<Route path="/oauth2/redirect/nickname" element={<NicknameSettingPage />} />
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
