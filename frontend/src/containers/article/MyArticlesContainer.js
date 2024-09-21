import React, { useEffect } from 'react';
import MyArticles from '../../components/article/MyArticles';
import { useDispatch, useSelector } from 'react-redux';
import { readMyArticles, unloadArticles } from '../../modules/article/articles/articlesActions';
const MyArticlesContainer = () => {
	const limit = 5;
	const dispatch = useDispatch();

	const articles = useSelector((state) => state.articles.articles);
	const error = useSelector((state) => state.articles.error);
	const loading = useSelector((state) => state.loading['article/READ_MY_ARTICLES']);

	const [page, setPage] = useState(1);
	const totalCnt = articles ? parseInt(articles.count) : 0;

	useEffect(() => {
		dispatch(
			readMyArticles({
				limit,
				page,
			}),
		);
		return () => {
			dispatch(unloadArticles());
		};
	}, [dispatch]);

	return <MyArticles articles={articles} error={error} loading={loading} />;
};

export default MyArticlesContainer;
