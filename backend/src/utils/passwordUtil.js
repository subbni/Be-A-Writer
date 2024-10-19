import bcrypt from 'bcrypt';
import AuthErrorMessage from '../constants/error/authErrorMessage.js';
import CustomError from '../constants/error/customError.js';

export const hashPassword = async (plainPassword) => {
	const saltRounds = 10;
	try {
		const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
		return hashedPassword;
	} catch (e) {
		console.error('비밀번호 해싱 오류');
		console.log(e);
		throw e;
	}
};

export const comparePassword = async (inputPassword, hashedPassword) => {
	try {
		const isMatch = await bcrypt.compare(inputPassword, hashedPassword);
		return isMatch;
	} catch (e) {
		console.error('비밀번호 비교 오류');
		console.log(e);
		throw e;
	}
};

export const verifyPassword = async (inputPassword, hashPassword) => {
	const isMatch = await comparePassword(inputPassword, hashPassword);
	if (!isMatch) {
		throw new CustomError(AuthErrorMessage.INVALID_PASSWORD);
	}
	return isMatch;
};
