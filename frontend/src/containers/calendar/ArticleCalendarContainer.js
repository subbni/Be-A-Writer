import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ArticleCalendarView from '../../components/calendar/ArticleCalendarView';
import useCalendar from '../../hooks/useCalendar';
import { getArticles, getArticlesByDate, initialize } from '../../modules/calendar/calendarActions';
const ArticleCalendarContainer = () => {
	const dispatch = useDispatch();
	const error = useSelector((state) => state.calendar.articles.error);
	const articles = useSelector((state) => state.calendar.articles.data);
	const articlesForMonth = useSelector((state) => state.calendar.articlesForMonth.data);
	const { selectedYear, selectedMonth } = useCalendar();
	const [year, setYear] = useState(selectedYear);
	const [month, setMonth] = useState(selectedMonth);
	const [day, setDay] = useState(null);

	useEffect(() => {
		dispatch(getArticles({ year, month: month + 1 }));
		return () => {
			dispatch(initialize());
		};
	}, [dispatch, year, month]);

	useEffect(() => {
		console.log(error);
	}, [error]);

	const onDateChange = useCallback(
		({ key, value }) => {
			console.log(key, value);
			switch (key) {
				case 'year':
					setYear(() => value);
					break;
				case 'month':
					setMonth(() => value);
					break;
				case 'day':
					setDay(() => value);
					dispatch(getArticlesByDate({ year, month: month + 1, day: value }));
					break;
				default:
					console.log('wrong key');
			}
		},
		[dispatch, year, month],
	);

	return (
		<ArticleCalendarView
			articles={articles}
			articlesForMonth={articlesForMonth}
			onDateChange={onDateChange}
		/>
	);
};

export default ArticleCalendarContainer;
