import React, { useEffect } from 'react';
import ArticleViewer from '../../components/article/ArticleViewer';
import { useDispatch, useSelector } from 'react-redux';
import { readArticle, unloadArticle } from '../../modules/article/articles/articlesActions';
import { useParams } from 'react-router-dom';

const ArticleViewerContainer = () => {
	const { articleId } = useParams();
	const dispatch = useDispatch();
	const { article, error, loading } = useSelector(({ articles, loading }) => ({
		article: articles.article,
		error: articles.error,
		loading: loading['articles/READ_ARTICLE'],
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
