import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';
import { format } from 'date-fns';
import LeftArrow from '../../images/LeftArrow.svg';
import RightArrow from '../../images/RightArrow.svg';
const CalendarBlock = styled.div`
	min-width: 350px;
	max-height: 400px;
	padding: 1rem;
	margin: 1rem;
	/* border: 1px solid gray; */
	/* background-color: var(--color-light-gray); */
`;

/**
 * Header
 */

const CalendarHeader = styled.div`
	height: 45px;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	/* border: 1px solid gray; */
	.left {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}
	.right {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}
	.btn {
		padding: 0.125rem;
		cursor: pointer;
	}
	span {
		padding: 0.125rem;
		font-size: large;
		font-weight: 600;
	}
`;

/**
 * Day List
 */
const dayList = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const CalendarDayListWrapper = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	padding: 0.5rem 0;
	/* border: 1px solid gray; */
`;
const CalendarDayList = styled.span`
	/* border: 1px solid gray; */
	width: 12%;
	text-align: center;
	line-height: 100%;
	${({ $sat }) =>
		$sat &&
		css`
			color: royalblue;
		`}
	${({ $sun }) =>
		$sun &&
		css`
			color: tomato;
		`}
`;

/**
 * Body
 */

const CalendarBody = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const WeekItem = styled.div`
	width: 100%;
	padding: 0.5rem 0;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`;
const DayItem = styled.div`
	width: 30px;
	height: 30px;
	text-align: center;
	line-height: 30px;
	border-radius: 100px;
	scale: 0.9;
	${({ $notThisMonth }) =>
		$notThisMonth &&
		css`
			visibility: hidden;
		`}
	${({ $hasArticle }) =>
		$hasArticle &&
		css`
			cursor: pointer;
			border: 1px solid gray;
			&:hover {
				scale: 1;
			}
		`}
		${({ $clicked }) =>
		$clicked &&
		css`
			background-color: var(--color-light-gray);
		`}
`;

const month = {
	0: 'jan',
	1: 'feb',
	2: 'mar',
	3: 'april',
	4: 'may',
	5: 'june',
	6: 'july',
	7: 'aug',
	8: 'sep',
	9: 'oct',
	10: 'nov',
	11: 'dec',
};

const CalendarSection = ({
	selectedYear,
	selectedMonth,
	selectedDay,
	handlePrevYear,
	handleNextYear,
	handlePrevMonth,
	handleNextMonth,
	handleDaySelect,
	weeks,
	articlesForMonth,
}) => {
	const hasArticleOnDate = (date) => {
		// 해당 날짜에 글이 있는지 체크하는 함수
		if (articlesForMonth) {
			const formattedDate = format(date, 'yyyy-MM-dd');
			return articlesForMonth.some(
				(article) => format(new Date(article.created_at), 'yyyy-MM-dd') === formattedDate,
			);
		}
	};

	return (
		<CalendarBlock>
			<CalendarHeader>
				<div className="left">
					<img className="btn" src={LeftArrow} alt="prev year" onClick={handlePrevYear} />
					<span>{selectedYear}</span>
					<img className="btn" src={RightArrow} alt="next year" onClick={handleNextYear} />
				</div>
				<div className="right">
					<img className="btn" src={LeftArrow} alt="prev month" onClick={handlePrevMonth} />
					<span>{month[selectedMonth]}</span>
					<img className="btn" src={RightArrow} alt="next month" onClick={handleNextMonth} />
				</div>
			</CalendarHeader>
			<CalendarDayListWrapper>
				{dayList.map((day) => (
					<CalendarDayList key={day} $sat={day === 'sat'} $sun={day === 'sun'}>
						{day}
					</CalendarDayList>
				))}
			</CalendarDayListWrapper>
			<CalendarBody>
				{weeks.map((week, idx) => (
					<WeekItem key={`week${idx}`}>
						{week.map((day) => {
							const text = format(day, 'd');
							const hasArticle = hasArticleOnDate(day); // 해당 날짜에 글이 있는지 확인
							return (
								<DayItem
									$notThisMonth={day.getMonth() !== selectedMonth}
									$clicked={day.getDate() === selectedDay}
									$hasArticle={hasArticle}
									key={`${idx}-${day}`}
									onClick={() => (hasArticle ? handleDaySelect(day) : null)}
								>
									{text}
								</DayItem>
							);
						})}
					</WeekItem>
				))}
			</CalendarBody>
		</CalendarBlock>
	);
};

export default CalendarSection;
