import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CalendarSection from './CalendarSection';
import Responsive from '../common/Responsive';
import ArticleListSection from './ArticleListSection';
import useCalendar from '../../hooks/useCalendar';

const ArticleCalendarViewBlock = styled(Responsive)`
	padding: 7rem 7rem;
	padding-bottom: 1rem;
	max-width: 1400px;
	/* border: 1px solid gray; */
`;

const ArticleCalendarViewWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	align-items: start;
	justify-content: center;
	@media (max-width: 1000px) {
		flex-direction: column;
		align-items: center;
	}
`;

const ArticleCalendarView = ({ articles, onDateChange, articlesForMonth }) => {
	const {
		selectedYear,
		selectedMonth,
		selectedDay,
		weeks,
		handlePrevYear,
		handleNextYear,
		handlePrevMonth,
		handleNextMonth,
		handleSelectedDay,
	} = useCalendar();

	useEffect(() => {
		console.log(`selectedYear's changed.`);
		onDateChange({
			key: 'year',
			value: selectedYear,
		});
	}, [onDateChange, selectedYear]);

	useEffect(() => {
		console.log(`selectedMonth's changed.`);
		onDateChange({
			key: 'month',
			value: selectedMonth,
		});
	}, [onDateChange, selectedMonth]);

	useEffect(() => {
		console.log(`selectedDay's changed.`);
		onDateChange({
			key: 'day',
			value: selectedDay,
		});
	}, [onDateChange, selectedDay]);

	return (
		<ArticleCalendarViewBlock>
			<ArticleCalendarViewWrapper>
				<CalendarSection
					selectedYear={selectedYear}
					selectedMonth={selectedMonth}
					selectedDay={selectedDay}
					weeks={weeks}
					handlePrevYear={handlePrevYear}
					handleNextYear={handleNextYear}
					handleNextMonth={handleNextMonth}
					handlePrevMonth={handlePrevMonth}
					handleDaySelect={handleSelectedDay}
					articles={articles}
					articlesForMonth={articlesForMonth}
				/>
				<ArticleListSection
					articles={articles}
					selectedYear={selectedYear}
					selectedMonth={selectedMonth}
					selectedDay={selectedDay}
				/>
			</ArticleCalendarViewWrapper>
		</ArticleCalendarViewBlock>
	);
};

export default ArticleCalendarView;
