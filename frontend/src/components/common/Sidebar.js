import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import Left from '../../images/light/Left.svg';
import Home from '../../images/light/Home.svg';
import Calendar from '../../images/light/Calendar.svg';
import Edit from '../../images/light/Edit.svg';
import Book from '../../images/light/Book.svg';
import Setting from '../../images/Settings.svg';
import DefaultProfile from '../../images/Profile.svg';
import { Link } from 'react-router-dom';
import {
	ARTICLE_WRITE_PAGE,
	CALENDAR_PAGE,
	FULL_ARTICLE_PAGE,
	MY_ARTICLES_PAGE,
	PROFILE_PAGE,
} from '../../constants/pagePaths';

const SideBarBlock = styled.div`
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	width: calc(1rem + 70px);
	height: 100%;
	background-color: white;
	/* box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08); */
	z-index: 101;
	padding-left: 1rem;
	transition: transform 0.3s ease-in-out;
	transform: translateX(0);
	${(props) =>
		props.$isClosed &&
		css`
			transform: translateX(-100%);
		`}
`;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: start;
	height: 100%;
	.btn {
		cursor: pointer;
	}
`;

const HeaderMenu = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	width: 70px;
	min-height: 4.2rem;
	padding-right: 1rem;
`;

const SideMenu = styled.ul`
	height: 100%;
	padding: 2rem 1rem 1rem 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	.top {
	}
	.bottom li {
		scale: 1;
	}
	.profile {
		border-radius: 30px;
	}
`;

const SideMenuItem = styled.li`
	padding: 1.25rem 0;
	scale: 0.9;
	&:hover {
		scale: 1;
	}
`;

const Sidebar = ({ isSidebarClosed, onMenuBtnClick, user }) => {
	return (
		<SideBarBlock $isClosed={isSidebarClosed}>
			<Wrapper>
				<HeaderMenu>
					<img className="btn menu-btn" src={Left} alt="close menu" onClick={onMenuBtnClick} />
				</HeaderMenu>
				<SideMenu>
					<div className="top">
						<SideMenuItem>
							<Link to={FULL_ARTICLE_PAGE}>
								<img className="btn" src={Home} alt="home" />
							</Link>
						</SideMenuItem>
						<SideMenuItem>
							<Link to={CALENDAR_PAGE}>
								<img className="btn" src={Calendar} alt="calendar" />
							</Link>
						</SideMenuItem>
						<SideMenuItem>
							<Link to={ARTICLE_WRITE_PAGE}>
								<img className="btn" src={Edit} alt="edit" />
							</Link>
						</SideMenuItem>
						<SideMenuItem>
							<Link to={MY_ARTICLES_PAGE}>
								<img className="btn" src={Book} alt="my articles" />
							</Link>
						</SideMenuItem>
					</div>
					<div className="bottom">
						{user && (
							<SideMenuItem>
								<Link to={PROFILE_PAGE + `${user.memberId}`}>
									<img
										className="btn profile"
										src={user.profileImageUrl || DefaultProfile}
										alt="mypage"
									/>
								</Link>
							</SideMenuItem>
						)}
					</div>
				</SideMenu>
			</Wrapper>
		</SideBarBlock>
	);
};

export default Sidebar;
