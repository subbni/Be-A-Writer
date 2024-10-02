import React, { useEffect, useState } from 'react';
import MyArticlesView from '../../components/article/MyArticlesView';
import { useDispatch, useSelector } from 'react-redux';
import { readMyArticles, unloadArticles } from '../../modules/article/articles/articlesActions';
import PaginationBar from '../../components/pagination/PaginationBar';

const MyArticlesContainer = () => {
	const limit = 10;
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
	}, [dispatch, limit, page]);

	const onPageChange = (page) => {
		setPage(page);
	};

	return (
		<>
			<MyArticlesView articles={articles} error={error} loading={loading} />
			<PaginationBar totalItemCnt={totalCnt} currentPage={page} onPageChange={onPageChange} />
		</>
	);
};

export default MyArticlesContainer;
