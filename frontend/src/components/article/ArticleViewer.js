import React from 'react';
import Responsive from '../common/Responsive';
import styled from 'styled-components';
import Kebab from '../../images/Kebab.svg';
import Profile from '../../images/Profile.svg';
import Lock from '../../images/light/Lock.svg';
import { formatDateTime } from '../../utils/dateUtils';
import { Link } from 'react-router-dom';

const ArticleViewerBlock = styled(Responsive)`
	padding: 10rem;
	padding-bottom: 5rem;
	max-width: 1300px;
`;

const ArticleHead = styled.div`
	border-bottom: 1px solid var(--color-gray);
	padding-bottom: 1rem;
`;

const TitleWrapper = styled.div`
	padding-bottom: 1.125rem;
	.title {
		font-size: 25px;
		font-weight: 500;
		padding-bottom: 10px;
	}
	.subtitle {
		color: var(--color-dark-gray);
		font-size: small;
	}
`;

const SubInfo = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	color: var(--color-dark-gray);
	.author {
		padding-right: 1rem;
		color: var(--color-black);
	}
	.left {
		display: flex;
		flex-direction: row;
		align-items: center;
		text-align: center;
		.profile {
			width: 27px;
			margin-right: 0.5rem;
		}
		.private {
			padding: 0 0.55rem;
			display: flex;
			flex-direction: row;
			justify-content: start;
			align-items: center;
			img {
				height: 90%;
			}
			text-align: center;
		}
	}
	.right {
		position: relative;
		.menu {
			padding-left: 1rem;
			cursor: pointer;
		}
	}
`;

const MenuDropdown = styled.div`
	display: none;
	&.clicked {
		position: absolute;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: white;
		width: 110px;
		right: 0;
		border-radius: 2px;
		border: 1px solid var(--color-gray);
	}
`;

const MenuDropdownItem = styled.div`
	width: 108px;
	height: 30px;
	line-height: 30px;
	font-size: 15px;
	text-align: center;
	cursor: pointer;
	&:not(:last-child) {
		border-bottom: 1px solid var(--color-gray);
	}
	&:hover {
		background-color: var(--color-light-gray);
	}
`;

const ArticleContent = styled.div`
	color: var(--color-article-content);
	padding: 1.125rem 0;
`;

const ArticleViewer = ({ article, error, loading, author, onDeleteClick, onModifyClick }) => {
	if (error) {
		console.log('에러 발생');
		console.log(error.message);
	}

	if (loading || !article) {
		return null;
	}

	const { title, subtitle, created_at, content, is_public, author_id } = article;
	const { nickname } = article.author;

	const onMenuClick = (e) => {
		const menuDropdown = document.querySelector('.menu-dropdown');
		menuDropdown.classList.toggle('clicked');
	};

	return (
		<ArticleViewerBlock>
			<ArticleHead>
				<TitleWrapper>
					<h2 className="title">{title}</h2>
					{subtitle && <div className="subtitle"> {subtitle}</div>}
				</TitleWrapper>
				<SubInfo>
					<div className="left">
						<img className="profile" src={Profile} alt="profile" />
						<Link to={`/${author_id}`}>
							<span className="author">{nickname}</span>
						</Link>
						<span>{formatDateTime(created_at)}</span>
						{!is_public && (
							<div className="private">
								<img src={Lock} alt="private post" />
								<span>비공개</span>
							</div>
						)}
					</div>
					{author && (
						<div className="right">
							<img className="menu" src={Kebab} alt="menu" onClick={onMenuClick} />
							<MenuDropdown className="menu-dropdown">
								<MenuDropdownItem className="modify" onClick={onModifyClick}>
									수정하기
								</MenuDropdownItem>
								<MenuDropdownItem className="delete" onClick={onDeleteClick}>
									삭제하기
								</MenuDropdownItem>
							</MenuDropdown>
						</div>
					)}
				</SubInfo>
			</ArticleHead>
			<ArticleContent>
				<div dangerouslySetInnerHTML={{ __html: content }} />
			</ArticleContent>
		</ArticleViewerBlock>
	);
};

export default ArticleViewer;
