import React from 'react';
import Editor from '../components/write/Editor';
import HeaderContainer from '../containers/HeaderContainer';
import Responsive from '../components/common/Responsive';
import Header from '../components/common/Header';

const WritePage = () => {
	return (
		<>
			<HeaderContainer />
			<Responsive>
				<Editor />
			</Responsive>
		</>
	);
};

export default WritePage;
