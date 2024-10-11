import React from 'react';
import ArticleViewerContainer from '../containers/article/ArticleViewerContainer';
import CommentViewerContainer from '../containers/comment/CommentViewerContainer';

const ArticlePage = () => {
	return (
		<>
			<ArticleViewerContainer />
			<CommentViewerContainer />
		</>
	);
};

export default ArticlePage;
