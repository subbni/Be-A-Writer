import { createAction } from 'redux-actions';
import { createRequestActionTypes } from '../../services/createRequestSaga';

export const INITIALIZE = 'articleEditor/INITIALIZE';
export const CHANGE_FIELD = 'articleEditor/CHANGE_FIELD';
export const [WRITE_ARTICLE, WRITE_ARTICLE_SUCCESS, WRITE_ARTICLE_FAILUER] =
	createRequestActionTypes('articleEditor/WRITE_ARTICLE');
export const SET_ORIGINAL_ARTICLE = 'articleEditor/SET_ORIGINAL_ARTICLE';
export const [MODIFY_ARTICLE, MODIFY_ARTICLE_SUCCESS, MODIFY_ARTICLE_FAILURE] =
	createRequestActionTypes('articles/MODIFY_ARTICLE');

export const initialize = createAction(INITIALIZE);
export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
	key: key,
	value: value,
}));
export const writeArticle = createAction(
	WRITE_ARTICLE,
	({ title, subtitle, content, isPublic }) => ({
		title,
		subtitle,
		content,
		isPublic,
	}),
);
export const setOriginalArticle = createAction(SET_ORIGINAL_ARTICLE, (article) => article);
export const modifyArticle = createAction(
	MODIFY_ARTICLE,
	({ articleId, title, subtitle, content, isPublic }) => ({
		articleId,
		title,
		subtitle,
		content,
		isPublic,
	}),
);
