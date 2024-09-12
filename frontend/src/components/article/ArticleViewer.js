import React from 'react';
import Responsive from '../common/Responsive';
import styled from 'styled-components';
import Kebab from '../../images/Kebab.svg';
import Profile from '../../images/Profile.svg';
import { formatDateTime } from '../../utils/dateUtils';

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
	}
`;

const ArticleContent = styled.div`
	color: var(--color-article-content);
	padding: 1.125rem 0;
`;

const ArticleViewer = ({ article, error, loading }) => {
	if (error) {
		console.log('에러 발생');
		console.log(error.message);
	}

	if (loading || !article) {
		return null;
	}

	const { title, subtitle, created_at, content } = article;
	const { nickname } = article.author;

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
						<span className="author">{nickname}</span>
						<span>{formatDateTime(created_at)}</span>
					</div>
					<img src={Kebab} alt="menu" />
				</SubInfo>
			</ArticleHead>
			<ArticleContent>
				<div dangerouslySetInnerHTML={{ __html: content }} />
			</ArticleContent>
		</ArticleViewerBlock>
	);
};

export default ArticleViewer;
