import { handleActions } from 'redux-actions';
import {
	CHANGE_FIELD,
	INITIALIZE,
	WRITE_ARTICLE,
	WRITE_ARTICLE_FAILUER,
	WRITE_ARTICLE_SUCCESS,
} from './articleEditorTypes';

const initialState = {
	title: '',
	subtitle: '',
	content: '',
	article: null,
	articleError: null,
};

const articleEditor = handleActions(
	{
		[INITIALIZE]: (state) => initialState,
		[CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
			...state,
			[key]: value,
		}),
		[WRITE_ARTICLE]: (state) => ({
			...state,
			article: null,
			articleError: null,
		}),
		[WRITE_ARTICLE_SUCCESS]: (state, { payload: article }) => ({
			...state,
			article,
		}),
		[WRITE_ARTICLE_FAILUER]: (state, { payload: articleError }) => ({
			...state,
			articleEditor,
		}),
	},
	initialState,
);

export default articleEditor;