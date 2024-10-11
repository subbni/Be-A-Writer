import { combineReducers } from 'redux';
import auth, { authSaga } from './auth/auth';
import loading from './loading';
import { all } from 'redux-saga/effects';
import articleEditor from './article/editor/articleEditorReducer';
import { articleEditorSaga } from './article/editor/articleEditorSaga';
import user, { userSaga } from './user/user';
import { articlesSaga } from './article/articles/articlesSaga';
import articles from './article/articles/articlesReducer';
import calendar from './calendar/calendarReducer';
import { calendarSaga } from './calendar/calendarSaga';
import comments from './comment/commentReducer';
import { commentSaga } from './comment/commentSaga';

const rootReducer = combineReducers({
	auth,
	loading,
	user,
	articleEditor,
	articles,
	calendar,
	comments,
});

export function* rootSaga() {
	yield all([
		authSaga(),
		userSaga(),
		articleEditorSaga(),
		articlesSaga(),
		calendarSaga(),
		commentSaga(),
	]);
}

export default rootReducer;
