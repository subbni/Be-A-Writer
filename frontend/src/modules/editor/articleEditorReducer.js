import { handleActions } from 'redux-actions';
import {
	CHANGE_FIELD,
	INITIALIZE,
	MODIFY_ARTICLE_FAILURE,
	MODIFY_ARTICLE_SUCCESS,
	SET_ORIGINAL_ARTICLE,
	WRITE_ARTICLE,
	WRITE_ARTICLE_FAILUER,
	WRITE_ARTICLE_SUCCESS,
} from './articleEditorTypes';

const initialState = {
	title: '',
	subtitle: '',
	content: '',
	is_public: true,
	originalArticle: '',
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
			articleError,
		}),
		[SET_ORIGINAL_ARTICLE]: (state, { payload: article }) => ({
			...state,
			title: article.title,
			subtitle: article.subtitle,
			content: article.content,
			is_public: article.is_public,
			originalArticle: article,
		}),
		[MODIFY_ARTICLE_SUCCESS]: (state, { payload: article }) => ({
			...state,
			article,
		}),
		[MODIFY_ARTICLE_FAILURE]: (state, { payload: error }) => ({
			...state,
			error,
		}),
	},
	initialState,
);

export default articleEditor;
