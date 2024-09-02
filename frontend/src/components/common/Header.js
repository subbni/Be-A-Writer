import React from 'react';
import styled from 'styled-components';
import Responsive from './Responsive';

const HeaderBlock = styled.div`
	position: fixed;
	width: 100%;
	background-color: var(--color-light-gray);
	box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
`;

const Wrapper = styled(Responsive)`
	height: 4.2rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 3rem;
	.logo {
		font-size: 1.5rem;
		font-family: var(--font-logo);
		letter-spacing: -2px;
	}
`;
const Header = () => {
	return (
		<>
			<HeaderBlock>
				<Wrapper>
					<div className="logo">Be A Writer</div>
					<div className="right">시작하기</div>
				</Wrapper>
			</HeaderBlock>
		</>
	);
};

export default Header;
