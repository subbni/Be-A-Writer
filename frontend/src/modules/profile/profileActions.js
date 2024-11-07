import { createAction } from 'redux-actions';
import { createRequestActionTypes } from '../../services/createRequestSaga';

export const [INITIALIZE_PROFILE, INITIALIZE_PROFILE_SUCCESS, INITIALIZE_PROFILE_FAILURE] =
	createRequestActionTypes('profile/INITIALIZE');

export const UNLOAD_ARTICLES = 'profile/UNLOAD_ARTICLES';

// 회원 프로필 조회
export const [READ_PROFILE, READ_PROFILE_SUCCESS, READ_PROFILE_FAILURE] =
	createRequestActionTypes('profile/READ_PROFILE');

// 본인 프로필 수정
export const [UPDATE_PROFILE, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAILURE] =
	createRequestActionTypes('profile/UPDATE_PROFILE');

// 본인 프로필 이미지 수정
export const [UPDATE_PROFILE_IMAGE, UPDATE_PROFILE_IMAGE_SUCCESS, UPDATE_PROFILE_IMAGE_FAILURE] =
	createRequestActionTypes('profile/UPDATE_PROFILE_IMAGE');

// 회원 작성글 조회
export const [READ_MEMBER_ARTICLES, READ_MEMBER_ARTICLES_SUCCESS, READ_MEMBER_ARTICLES_FAILURE] =
	createRequestActionTypes('profile/READ_MEMBER_ARTICLES');

export const initializeProfile = createAction(INITIALIZE_PROFILE);
export const readProfile = createAction(READ_PROFILE, (id) => id);
export const updateProfile = createAction(UPDATE_PROFILE, ({ memberId, nickname, bio }) => ({
	memberId,
	nickname,
	bio,
}));
export const updateProfileImage = createAction(UPDATE_PROFILE_IMAGE, (file) => file);
export const readMemberArticles = createAction(READ_MEMBER_ARTICLES, (id) => id);
export const unloadArticles = createAction(UNLOAD_ARTICLES);
