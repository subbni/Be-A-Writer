import { useEffect, useState } from 'react';
import {
	addMonths,
	addYears,
	eachDayOfInterval,
	endOfMonth,
	endOfWeek,
	getDate,
	getMonth,
	getYear,
	startOfMonth,
	startOfWeek,
	subMonths,
	subYears,
} from 'date-fns';

const useCalendar = () => {
	const [selectedYear, setSelectedYear] = useState(null);
	const [selectedMonth, setSelectedMonth] = useState(null);
	const [selectedDay, setSelectedDay] = useState(null);

	useEffect(() => {
		const currentDate = new Date();
		setSelectedYear(getYear(currentDate));
		setSelectedMonth(getMonth(currentDate));
	}, []);

	const handlePrevYear = () => {
		const prevYear = subYears(new Date(selectedYear, selectedMonth), 1);
		setSelectedYear(getYear(prevYear));
		setSelectedMonth(getMonth(prevYear));
	};

	const handleNextYear = () => {
		const nextMonth = addYears(new Date(selectedYear, selectedMonth), 1);
		setSelectedYear(getYear(nextMonth));
		setSelectedMonth(getMonth(nextMonth));
	};

	const handlePrevMonth = () => {
		const prevMonth = subMonths(new Date(selectedYear, selectedMonth), 1);
		setSelectedYear(getYear(prevMonth));
		setSelectedMonth(getMonth(prevMonth));
	};

	const handleNextMonth = () => {
		const nextMonth = addMonths(new Date(selectedYear, selectedMonth), 1);
		setSelectedYear(getYear(nextMonth));
		setSelectedMonth(getMonth(nextMonth));
	};

	const handleSelectedDay = (date) => {
		setSelectedDay(getDate(date));
	};

	const days = eachDayOfInterval({
		start: startOfWeek(startOfMonth(new Date(selectedYear, selectedMonth)), {
			weekStartsOn: 1,
		}),
		end: endOfWeek(endOfMonth(new Date(selectedYear, selectedMonth)), {
			weekStartsOn: 1,
		}),
	});

	const weeks = [];
	for (let i = 0; i < days.length; i += 7) {
		weeks.push(days.slice(i, i + 7));
	}

	return {
		selectedYear,
		selectedMonth,
		selectedDay,
		weeks,
		handlePrevYear,
		handleNextYear,
		handlePrevMonth,
		handleNextMonth,
		handleSelectedDay,
	};
};

export default useCalendar;
