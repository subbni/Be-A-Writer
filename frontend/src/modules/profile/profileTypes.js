import { createRequestActionTypes } from '../../services/createRequestSaga';

export const [INITIALIZE_PROFILE, INITIALIZE_PROFILE_SUCCESS, INITIALIZE_PROFILE_FAILURE] =
	createRequestActionTypes('profile/INITIALIZE');

// 프로필 조회
export const [READ_PROFILE, READ_PROFILE_SUCCESS, READ_PROFILE_FAILURE] =
	createRequestActionTypes('profile/READ_PROFILE');

// 프로필 수정
export const [UPDATE_PROFILE, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAILURE] =
	createRequestActionTypes('profile/UPDATE_PROFILE');
