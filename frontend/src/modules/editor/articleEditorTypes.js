import { createRequestActionTypes } from '../../services/createRequestSaga';

export const INITIALIZE = 'articleEditor/INITIALIZE';
export const CHANGE_FIELD = 'articleEditor/CHANGE_FIELD';
export const [WRITE_ARTICLE, WRITE_ARTICLE_SUCCESS, WRITE_ARTICLE_FAILUER] =
	createRequestActionTypes('articleEditor/WRITE_ARTICLE');
export const SET_ORIGINAL_ARTICLE = 'articleEditor/SET_ORIGINAL_ARTICLE';
// 수정
export const [MODIFY_ARTICLE, MODIFY_ARTICLE_SUCCESS, MODIFY_ARTICLE_FAILURE] =
	createRequestActionTypes('articles/MODIFY_ARTICLE');
