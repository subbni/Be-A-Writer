export const formatDate = (isoString) => {
	const date = new Date(isoString);

	const year = date.getFullYear();
	const month = date.getMonth() + 1; // getMonth()는 0부터 시작하므로 +1
	const day = date.getDate();

	return `${year}.${month}.${day}`;
};

export const formatDateTime = (isoString) => {
	const date = new Date(isoString);

	const year = date.getFullYear();
	const month = date.getMonth() + 1; // getMonth()는 0부터 시작하므로 +1
	const day = date.getDate();
	const hours = date.getHours().toString().padStart(2, '0'); // 두 자리로 맞추기
	const minutes = date.getMinutes().toString().padStart(2, '0'); // 두 자리로 맞추기

	return `${year}.${month}.${day}  ${hours}:${minutes}`;
};

export const getTimeAgo = (isoString) => {
	const date = new Date(isoString);
	const now = new Date();
	const differenceInMs = now - date; // 두 날짜 차이 (밀리초)

	const msInMinute = 1000 * 60;
	const msInHour = 1000 * 60 * 60;
	const msInDay = 1000 * 60 * 60 * 24;

	if (differenceInMs < msInMinute) {
		return '방금 전';
	}

	// 1시간 이내면 'n분 전'
	if (differenceInMs < msInHour) {
		const minutes = Math.floor(differenceInMs / msInMinute);
		return `${minutes}분 전`;
	}

	// 24시간 이내면 'n시간 전'
	if (differenceInMs < msInDay) {
		const hours = Math.floor(differenceInMs / msInHour);
		return `${hours}시간 전`;
	}

	return formatDate(isoString);
};
