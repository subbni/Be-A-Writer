import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MainPage from './pages/MainPage';
import OAuth2RedirectHandler from './containers/auth/OAuth2RedirectHanlder';
import WritePage from './pages/WritePage';
import ArticlePage from './pages/ArticlePage';
import Layout from './containers/common/Layout';

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<Layout />}>
					<Route path="/" element={<MainPage />} />
					<Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
					<Route path="/write" element={<WritePage />} />
					<Route path="/article/:id" element={<ArticlePage />} />
				</Route>
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
