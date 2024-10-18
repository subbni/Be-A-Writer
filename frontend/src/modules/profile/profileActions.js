import { createAction } from 'redux-actions';
import { INITIALIZE_PROFILE, READ_PROFILE, UPDATE_PROFILE } from './profileTypes';

export const initializeProfile = createAction(INITIALIZE_PROFILE);
export const readProfile = createAction(READ_PROFILE, (id) => id);
export const updateProfile = createAction(UPDATE_PROFILE, ({ memberId, nickname, bio }) => ({
	memberId,
	nickname,
	bio,
}));
