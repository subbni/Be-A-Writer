import { combineReducers } from 'redux';
import auth, { authSaga } from './auth/auth';
import loading from './loading';
import { all } from 'redux-saga/effects';
import articleEditor from './article/articleEditorReducer';
import { articleEditorSaga } from './article/articleEditorSaga';
import user, { userSaga } from './user/user';

const rootReducer = combineReducers({
	auth,
	loading,
	user,
	articleEditor,
});

export function* rootSaga() {
	yield all([authSaga(), userSaga(), articleEditorSaga()]);
}

export default rootReducer;
