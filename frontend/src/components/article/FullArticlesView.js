import React from 'react';
import Responsive from '../common/Responsive';
import styled from 'styled-components';
import ArticleList from './common/ArticleList';

const FullArticlesBlock = styled(Responsive)`
	padding: 10rem;
	padding-bottom: 1rem;
	max-width: 1300px;
	min-width: 800px;
`;

const FullArticlesView = ({ articles }) => {
	return (
		<FullArticlesBlock>
			<ArticleList articles={articles} />
		</FullArticlesBlock>
	);
};

export default FullArticlesView;
