import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { formatDate } from '../../../utils/dateUtils';
import Comment from '../../../images/Comment.svg';
import Lock from '../../../images/light/Lock.svg';

const ArticlesWrapper = styled.div`
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
	&:hover {
		cursor: pointer;
		.title {
			text-decoration: underline;
		}
	}
	.article-info {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		text-align: center;
		.info_left {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			img {
				display: block;
				width: 22px;
			}
		}
		.info_right {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			img {
				display: block;
				width: 22px;
				margin-right: 0.25rem;
				margin-bottom: 0.25rem;
			}
		}
		span {
			padding-right: 0.5rem;
		}
		.author {
			font-style: italic;
			font-size: 0.8rem;
		}
	}
`;

const ArticleList = ({ articles, lastItemRef }) => {
	return (
		<ArticlesWrapper>
			{articles &&
				articles.data.map((article, idx) => (
					<ArticleItem key={article.article_id} to={`/article/${article.article_id}`}>
						{idx === articles.data.length - 1 && <div ref={lastItemRef}></div>}
						<h2 className="title">{article.title}</h2>
						<div className="content">
							{article.subtitle && <span className="subtitle">{article.subtitle}</span>}
							{article.content.replace(/(<([^>]+)>)/gi, '')}
						</div>
						<div className="article-info">
							<div className="info_left">
								<span className="createdAt">{formatDate(article.created_at)}</span>
								{article.author_nickname && (
									<span className="author">by {article.author_nickname}</span>
								)}
								{!article.is_public && <img src={Lock} alt="private post" />}
							</div>
							<div className="info_right">
								<img src={Comment} alt="comment" />
								{article.comment_count}
							</div>
						</div>
					</ArticleItem>
				))}
		</ArticlesWrapper>
	);
};

export default ArticleList;
