import React from 'react';
import styled, { css } from 'styled-components';

const ProfileTabBlock = styled.div`
	width: 100%;
	margin: 1rem 0;
`;

const ProfileTabWrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;

const ProfileTabItem = styled.div`
	text-align: center;
	flex: 1 1 0;
	padding: 1rem;
	border-top: 1px solid var(--color-gray);
	color: var(--color-dark-gray);
	cursor: pointer;
	${({ $isClicked }) =>
		$isClicked &&
		css`
			border-top: 1.5px solid var(--color-black);
			color: var(--color-black);
		`};
`;

const ProfileTab = () => {
	return (
		<ProfileTabBlock>
			<ProfileTabWrapper>
				<ProfileTabItem $isClicked>작가 소개</ProfileTabItem>
				<ProfileTabItem>작성글</ProfileTabItem>
				<ProfileTabItem>작품</ProfileTabItem>
			</ProfileTabWrapper>
		</ProfileTabBlock>
	);
};

export default ProfileTab;
