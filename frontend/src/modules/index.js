import { combineReducers } from 'redux';
import auth, { authSaga } from './auth/auth';
import loading from './loading';
import { all } from 'redux-saga/effects';
import articleEditor from './article/editor/articleEditorReducer';
import { articleEditorSaga } from './article/editor/articleEditorSaga';
import user, { userSaga } from './user/user';
import { articleSaga } from './article/read/readArticleSaga';
import article from './article/read/readArticleReducer';

const rootReducer = combineReducers({
	auth,
	loading,
	user,
	articleEditor,
	article,
});

export function* rootSaga() {
	yield all([authSaga(), userSaga(), articleEditorSaga(), articleSaga()]);
}

export default rootReducer;
