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
