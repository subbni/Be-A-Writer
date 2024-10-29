import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { formatDate } from '../../utils/dateUtils';
import Lock from '../../images/light/Lock.svg';

const ArticleListBlock = styled.div`
	position: relative;
	width: 600px;
	max-height: 600px;
	padding: 1rem;
	margin: 1rem;
	/* border: 1px solid gray; */
	overflow-y: scroll;
`;

const ArticleItem = styled(Link)`
	font-size: 17px;
	width: 100%;
	height: 120px;
	border-bottom: 1px solid gray;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: start;
	padding: 1.125rem 0;
	color: var(--color-dark-gray);
	.title {
		font-size: 19px;
		font-weight: 400;
		color: var(--color-black);
	}
	.subtitle {
		color: var(--color-black);
		padding-right: 0.5rem;
	}
	.content {
		width: 100%;
		overflow: hidden; /* 넘치는 부분 가리기 */
		text-overflow: ellipsis; /* ... 처리하기 */
		white-space: nowrap; /* 줄바꿈 안하기 (한 줄 밑줄임표 적용) */
	}
	.info {
		display: flex;
		flex-direction: row;
		justify-content: start;
		align-items: center;

		img {
			height: 90%;
			padding-left: 0.5rem;
		}
	}

	&:hover {
		cursor: pointer;
		.title {
			text-decoration: underline;
		}
	}
`;

const ArticleListHeader = styled.div`
	width: 100%;
	height: 20px;
	background-color: white;
	text-align: center;
`;

const ArticleListSection = ({ articles }) => {
	return (
		<ArticleListBlock>
			<ArticleListHeader>{articles && <div>총 {articles.length}개의 글</div>}</ArticleListHeader>
			{articles && articles.length > 0
				? articles.map((article, idx) => (
						<ArticleItem key={`article${idx}`} to={`/article/${article.article_id}`}>
							<h2 className="title">{article.title}</h2>
							<div className="content">
								{article.subtitle && <span className="subtitle">{article.subtitle}</span>}
								{article.content.replace(/(<([^>]+)>)/gi, '')}
							</div>
							<div className="info">
								<span>{formatDate(article.created_at)}</span>
								{!article.is_public && <img src={Lock} alt="private post" />}
							</div>
						</ArticleItem>
				  ))
				: null}
		</ArticleListBlock>
	);
};

export default ArticleListSection;
