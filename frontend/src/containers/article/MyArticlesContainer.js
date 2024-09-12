import React, { useEffect } from 'react';
import MyArticles from '../../components/article/MyArticles';
import { useDispatch, useSelector } from 'react-redux';
import { readMyArticles, unloadArticles } from '../../modules/article/read/readArticleActions';
const MyArticlesContainer = () => {
	const dispatch = useDispatch();
	const { articles, error, loading } = useSelector(({ article, loading }) => ({
		articles: article.articles,
		error: article.error,
		loading: loading['article/READ_MY_ARTICLES'],
	}));

	useEffect(() => {
		dispatch(readMyArticles());
		return () => {
			dispatch(unloadArticles());
		};
	}, [dispatch]);

	return <MyArticles articles={articles} error={error} loading={loading} />;
};

export default MyArticlesContainer;
