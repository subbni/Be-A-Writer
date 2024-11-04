import React from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import ArticleList from './common/ArticleList';

const MyArticlesBlock = styled(Responsive)`
	padding: 10rem;
	padding-bottom: 1rem;
	max-width: 1300px;
`;

const MyArticlesView = ({ articles, error, loading }) => {
	return (
		<MyArticlesBlock>
			<ArticleList articles={articles} />
		</MyArticlesBlock>
	);
};

export default MyArticlesView;
