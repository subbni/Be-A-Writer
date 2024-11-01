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

const ProfileTab = ({ tabs, clickedTab, onTabClick }) => {
	return (
		<ProfileTabBlock>
			<ProfileTabWrapper>
				{tabs.map((tab, index) => (
					<ProfileTabItem
						key={index}
						onClick={() => onTabClick(index)}
						$isClicked={clickedTab === index}
					>
						{tab}
					</ProfileTabItem>
				))}
			</ProfileTabWrapper>
		</ProfileTabBlock>
	);
};

export default ProfileTab;
