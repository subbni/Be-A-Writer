import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ArticleFeed from '../../components/article/ArticleFeed';
import PaginationBar from '../../components/pagination/PaginationBar';
import { readAllArticles, unloadArticles } from '../../modules/article/articles/articlesActions';

const ArticleFeedContainer = () => {
	const limit = 10;
	const dispatch = useDispatch();

	const articles = useSelector((state) => state.articles.articles);
	const error = useSelector((state) => state.articles.error);
	const loading = useSelector((state) => state.loading['article/READ_ALL_ARTICLES']);

	const [page, setPage] = useState(1);
	const totalCnt = articles ? parseInt(articles.count) : 0;

	useEffect(() => {
		console.log(`limit : ${limit}, page:${page} dispatch`);
		dispatch(readAllArticles({ limit, page }));

		return () => {
			dispatch(unloadArticles());
		};
	}, [dispatch, limit, page]);

	const onPageChange = (page) => {
		setPage(page);
	};

	return (
		<>
			<ArticleFeed articles={articles} error={error} loading={loading} />
			<PaginationBar
				totalItemCnt={totalCnt}
				currentPage={page}
				onPageChange={onPageChange}
				itemCntPerPage={limit}
				btnRange={5}
			/>
		</>
	);
};

export default ArticleFeedContainer;
