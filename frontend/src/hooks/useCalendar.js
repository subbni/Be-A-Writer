import { useState } from 'react';
import {
	addMonths,
	eachDayOfInterval,
	endOfMonth,
	endOfWeek,
	getMonth,
	getYear,
	startOfMonth,
	startOfWeek,
	subMonths,
} from 'date-fns';

const useCalendar = () => {
	const [currentDate, setCurrentDate] = useState(new Date()); // 현재 날짜
	const [selectedYear, setSelectedYear] = useState(getYear(currentDate));
	const [selectedMonth, setSelectedMonth] = useState(getMonth(currentDate));

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
		weeks,
		handlePrevMonth,
		handleNextMonth,
	};
};

export default useCalendar;
