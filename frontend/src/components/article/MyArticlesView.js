import React from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/dateUtils';

const MyArticlesBlock = styled(Responsive)`
	padding: 10rem;
	padding-bottom: 1rem;
	max-width: 1300px;
`;

const ArticleWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const ArticleItem = styled(Link)`
	width: 100%;
	height: 150px;
	border-bottom: 1px solid gray;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: start;
	padding: 1.125rem 0;
	color: var(--color-dark-gray);
	.title {
		font-size: 22px;
		font-weight: 500;
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
	&:hover {
		cursor: pointer;
		.title {
			text-decoration: underline;
		}
	}
`;

const MyArticlesView = ({ articles, error, loading }) => {
	return (
		<MyArticlesBlock>
			<ArticleWrapper>
				{articles &&
					articles.data.map((article) => (
						<ArticleItem key={article.article_id} to={`/article/${article.article_id}`}>
							<h2 className="title">{article.title}</h2>
							<div className="content">
								{article.subtitle && <span className="subtitle">{article.subtitle}</span>}
								{article.content.replace(/(<([^>]+)>)/gi, '')}
							</div>
							<div className="createdAt">{formatDate(article.created_at)}</div>
						</ArticleItem>
					))}
			</ArticleWrapper>
		</MyArticlesBlock>
	);
};

export default MyArticlesView;
