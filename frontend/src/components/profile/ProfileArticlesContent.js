import React, { useCallback, useEffect, useRef, useState } from 'react';
import ArticleList from '../article/common/ArticleList';
import styled from 'styled-components';

const ProfileArticlesContentWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const NoWrittenArticles = styled.div`
	margin-top: 3rem;
	padding: 1rem;
	font-size: 0.9rem;
	color: var(--color-dark-gray);
`;

const ArticleCountInfo = styled.div`
	font-size: 0.9rem;
	color: var(--color-dark-gray);
	span {
		color: var(--color-point);
		font-weight: 500;
	}
`;

const ProfileArticlesContent = ({ articles, onInfiniteScroll, articlesLoading }) => {
	const observer = useRef(null);
	const [hasMoreData, setHasMoreData] = useState(true);

	useEffect(() => {
		if (hasMoreData) {
			if (articles.totalCount === articles.count + '') {
				setHasMoreData(false);
			}
		} else if (articles.totalCount < articles.count + '') {
			setHasMoreData(true);
		}
	}, [articles]);

	const lastItemRef = useCallback(
		(node) => {
			if (articlesLoading) return;

			if (observer.current) observer.current.disconnect();

			observer.current = new IntersectionObserver(
				(entries) => {
					if (entries[0].isIntersecting) {
						if (hasMoreData) {
							onInfiniteScroll();
						}
						// setPage로 page+1 처리를 해준다.
						// page가 변경되면 useEffect에 따라 해당 page의 articles을 요청한다.
					}
				},
				{ threshold: 1 },
			);

			if (node) observer.current.observe(node);
		},
		[articlesLoading, onInfiniteScroll],
	);

	return (
		<ProfileArticlesContentWrapper>
			<div>
				{articles?.totalCount === '0' ? (
					<NoWrittenArticles>아직 작성한 글이 없습니다.</NoWrittenArticles>
				) : (
					<ArticleCountInfo>
						<span>{articles.totalCount}</span>개의 글
					</ArticleCountInfo>
				)}
			</div>
			<ArticleList articles={articles} lastItemRef={lastItemRef} />
		</ProfileArticlesContentWrapper>
	);
};

export default ProfileArticlesContent;
