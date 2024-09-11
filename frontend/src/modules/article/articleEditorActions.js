import { createAction } from 'redux-actions';
import { CHANGE_FIELD, INITIALIZE, WRITE_ARTICLE } from './articleEditorTypes';

export const initialize = createAction(INITIALIZE);
export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
	key: key,
	value: value,
}));
export const writeArticle = createAction(WRITE_ARTICLE, ({ title, subtitle, content }) => ({
	title: title,
	subtitle: subtitle,
	content: content,
}));
