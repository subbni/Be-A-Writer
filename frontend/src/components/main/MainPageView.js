import React, { useReducer } from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import { Link } from 'react-router-dom';
import { ARTICLE_WRITE_PAGE, REGISTER_PAGE } from '../../constants/pagePaths';

const MainPageBlock = styled(Responsive)`
	padding: 10rem;
	padding-bottom: 1rem;
	max-width: 1300px;
	min-width: 800px;
`;

const MainPageWrapper = styled.div`
	h1 {
		font-size: 1.7rem;
		margin: 0.5rem 0;
	}
`;

const GoToEditor = styled(Link)`
	display: block;
	background-color: var(--color-point);
	padding: 0.5rem;
	color: white;
	border-radius: 5px;
	width: 150px;
	text-align: center;
	margin: 1rem 0;
	font-weight: 500;
`;

const MainPageView = ({ user }) => {
	return (
		<MainPageBlock>
			<MainPageWrapper>
				{user ? (
					<>
						<h1>{user.nickname}님, 좋은 하루입니다!</h1>
						<h2>오늘은 어떤 생각을 하고 있나요? 지나갈 오늘에 대한 기록을 남겨보세요</h2>
						<GoToEditor to={ARTICLE_WRITE_PAGE}>바로 글쓰러 가기</GoToEditor>
					</>
				) : (
					<>
						<h2>지나가는 매일에 대한 기록을 남겨보세요!</h2>
						<GoToEditor to={REGISTER_PAGE}>가입하러 가기</GoToEditor>
					</>
				)}
			</MainPageWrapper>
		</MainPageBlock>
	);
};

export default MainPageView;
