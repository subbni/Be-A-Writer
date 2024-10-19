import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PaginationButton from './PaginationButton';

const PaginationBarBlock = styled.div`
	height: 25px;
	margin: 1rem;
	margin-top: 3rem;
	margin-bottom: 4rem;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
`;

/**
 * totalItemCnt : 총 데이터의 수
 * itemCntPerPage : 한 페이지 당 아이템 수
 * btnRange : 한 번에 보여지는 페이지 버튼 수
 * currentPage : 현재 페이지 번호
 * start : 맨 앞에 보여질 버튼 번호
 * totalPages : 총 페이지 수
 */

const PaginationBar = ({
	totalItemCnt,
	onPageChange,
	currentPage,
	itemCntPerPage = 5,
	btnRange = 5,
}) => {
	const [start, setStart] = useState(1);
	const totalPages = Math.ceil(totalItemCnt / itemCntPerPage);

	useEffect(() => {
		setStart(Math.floor((currentPage - 1) / btnRange) * btnRange + 1);
	}, [currentPage, btnRange]);

	const onPageClick = (page) => {
		onPageChange(page);
	};

	return totalPages > 1 ? (
		<PaginationBarBlock>
			{start !== 1 && (
				<PaginationButton text="<" onClick={() => setStart(start - btnRange)} $active={false} />
			)}
			{Array.from(
				{ length: btnRange },
				(_, idx) =>
					start + idx <= totalPages && (
						<PaginationButton
							key={`pageBtn${start + idx}`}
							text={start + idx}
							$active={currentPage === start + idx}
							onClick={() => onPageClick(start + idx)}
						/>
					),
			)}
			{start + btnRange - 1 < totalPages && (
				<PaginationButton text=">" onClick={() => setStart(start + btnRange)} $active={false} />
			)}
		</PaginationBarBlock>
	) : null;
};

export default PaginationBar;
