import { combineReducers } from 'redux';
import auth, { authSaga } from './auth/auth';
import loading from './loading';
import { all } from 'redux-saga/effects';
import articleEditor from './article/editor/articleEditorReducer';
import { articleEditorSaga } from './article/editor/articleEditorSaga';
import user, { userSaga } from './user/user';
import { articlesSaga } from './article/articles/articlesSaga';
import articles from './article/articles/articlesReducer';

const rootReducer = combineReducers({
	auth,
	loading,
	user,
	articleEditor,
	articles,
});

export function* rootSaga() {
	yield all([authSaga(), userSaga(), articleEditorSaga(), articlesSaga()]);
}

export default rootReducer;
