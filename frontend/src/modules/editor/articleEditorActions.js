import { createAction } from 'redux-actions';
import {
	CHANGE_FIELD,
	INITIALIZE,
	MODIFY_ARTICLE,
	SET_ORIGINAL_ARTICLE,
	WRITE_ARTICLE,
} from './articleEditorTypes';

export const initialize = createAction(INITIALIZE);
export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
	key: key,
	value: value,
}));
export const writeArticle = createAction(
	WRITE_ARTICLE,
	({ title, subtitle, content, is_public }) => ({
		title,
		subtitle,
		content,
		is_public,
	}),
);
export const setOriginalArticle = createAction(SET_ORIGINAL_ARTICLE, (article) => article);
export const modifyArticle = createAction(
	MODIFY_ARTICLE,
	({ articleId, title, subtitle, content, is_public }) => ({
		articleId,
		title,
		subtitle,
		content,
		is_public,
	}),
);
