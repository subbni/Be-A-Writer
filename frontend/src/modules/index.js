import { combineReducers } from 'redux';
import loading from './loading';
import { all } from 'redux-saga/effects';
import auth from './auth/authReducer';
import user from './user/userReducer';
import calendar from './calendar/calendarReducer';
import comments from './comment/commentReducer';
import profile from './profile/profileReducer';
import articleEditor from './editor/articleEditorReducer';
import articles from './articles/articlesReducer';
import { authSaga } from './auth/authSaga';
import { userSaga } from './user/userSaga';
import { profileSaga } from './profile/profileSaga';
import { commentSaga } from './comment/commentSaga';
import { calendarSaga } from './calendar/calendarSaga';
import { articlesSaga } from './articles/articlesSaga';
import { articleEditorSaga } from './editor/articleEditorSaga';

const rootReducer = combineReducers({
	auth,
	loading,
	user,
	articleEditor,
	articles,
	calendar,
	comments,
	profile,
});

export function* rootSaga() {
	yield all([
		authSaga(),
		userSaga(),
		articleEditorSaga(),
		articlesSaga(),
		calendarSaga(),
		commentSaga(),
		profileSaga(),
	]);
}

export default rootReducer;
