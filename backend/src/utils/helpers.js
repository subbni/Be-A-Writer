export const areAllFieldsDefined = (obj) => {
	for (let key in obj) {
		if (obj[key] === null || obj[key] === undefined) {
			return false;
		}
	}
	return true;
};
