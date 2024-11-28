import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { check } from '../../modules/user/userActions';

const OAuth2RedirectHandler = () => {
	const dispatch = useDispatch();
	const location = useLocation();
	const navigate = useNavigate();
	const user = useSelector((state) => state.user.user);

	useEffect(() => {
		const queryParams = new URLSearchParams(location.search);
		const error = queryParams.get('error');

		if (error) {
			window.alert(error);
			navigate('/login');
		} else {
			dispatch(check());
		}
	}, [location, navigate, dispatch]);

	useEffect(() => {
		if (user) {
			if (user) {
				navigate('/');
				try {
					localStorage.setItem('user', JSON.stringify(user));
				} catch (e) {
					console.log('localStorage is not working');
				}
			}
		}
	}, [user, navigate]);
	return null;
};

export default OAuth2RedirectHandler;
