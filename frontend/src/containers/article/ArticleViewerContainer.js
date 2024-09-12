import React, { useEffect } from 'react';
import ArticleViewer from '../../components/article/ArticleViewer';
import { useDispatch, useSelector } from 'react-redux';
import { readArticle, unloadArticle } from '../../modules/article/read/readArticleActions';
import { useParams } from 'react-router-dom';

const ArticleViewerContainer = () => {
	const { articleId } = useParams();
	const dispatch = useDispatch();
	const { article, error, loading } = useSelector(({ article, loading }) => ({
		article: article.article,
		error: article.error,
		loading: loading['article/READ_ARTICLE'],
	}));

	useEffect(() => {
		dispatch(readArticle(articleId));
		return () => {
			// 언마운트될 때
			dispatch(unloadArticle());
		};
	}, [dispatch, articleId]);

	return <ArticleViewer article={article} error={error} loading={loading} />;
};

export default ArticleViewerContainer;
