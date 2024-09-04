import React from 'react';
import styled from 'styled-components';
import Responsive from './Responsive';
import { Link } from 'react-router-dom';

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
const Header = ({ user, onLogout }) => {
	return (
		<>
			<HeaderBlock>
				<Wrapper>
					<Link to="/" className="logo">
						Be A Writer
					</Link>
					{user ? (
						<div className="right">
							<span>{user.nickname}</span>
							<span onClick={onLogout}>로그아웃</span>
						</div>
					) : (
						<Link to="/login" className="right">
							시작하기
						</Link>
					)}
				</Wrapper>
			</HeaderBlock>
		</>
	);
};

export default Header;
