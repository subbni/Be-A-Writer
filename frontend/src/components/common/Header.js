import React from 'react';
import styled from 'styled-components';
import Responsive from './Responsive';
import { Link } from 'react-router-dom';
import Burger from '../../images/light/Burger.svg';
import Left from '../../images/light/Left.svg';
import DefaultProfile from '../../images/Profile.svg';

const HeaderBlock = styled.div`
	position: fixed;
	width: 100%;
	background-color: white;
	/* box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08); */
	z-index: 101;
`;

const Wrapper = styled(Responsive)`
	height: 4.2rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-right: 2rem;
	.logo {
		font-size: 1.5rem;
		font-family: var(--font-logo);
		letter-spacing: -2px;
	}
	.btn {
		cursor: pointer;
	}
	.right {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		img {
			cursor: pointer;
			padding-right: 0.3rem;
		}
		span {
			font-size: 0.9rem;
		}
	}
`;

const LeftWrapper = styled.div`
	width: 200px;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const Menu = styled.div`
	width: 70px;
	text-align: center;
	padding-right: 1rem; // Responsive의 padding-left와 동일하게
`;

const Login = styled(Link)`
	height: 35px;
	width: 80px;
	text-align: center;
	line-height: 35px;
	border: 1px solid var(--color-gray);
	border-radius: 100px;
	font-size: 16px;
`;

const Header = ({ user, onLogout, onMenuBtnClick }) => {
	return (
		<>
			<HeaderBlock>
				<Wrapper>
					<LeftWrapper>
						<Menu>
							<img className="btn menu-btn" src={Burger} alt="menu" onClick={onMenuBtnClick} />
						</Menu>
						<Link to="/" className="logo">
							Be A Writer
						</Link>
					</LeftWrapper>
					{user ? (
						<div className="right">
							{/* <img src={DefaultProfile} alt="profile" onClick={onLogout} /> */}
							<span class="" onClick={onLogout}>
								END
							</span>
						</div>
					) : (
						<Login to="/login" className="right">
							시작하기
						</Login>
					)}
				</Wrapper>
			</HeaderBlock>
		</>
	);
};

export default Header;
