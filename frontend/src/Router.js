import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MainPage from './pages/MainPage';
import OAuth2RedirectHandler from './containers/auth/OAuth2RedirectHanlder';

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<MainPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
				<Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
