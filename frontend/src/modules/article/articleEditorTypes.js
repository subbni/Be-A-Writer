import { createRequestActionTypes } from '../../services/createRequestSaga';

export const INITIALIZE = 'articleEditor/INITIALIZE';
export const CHANGE_FIELD = 'articleEditor/CHANGE_FIELD';
export const [WRITE_ARTICLE, WRITE_ARTICLE_SUCCESS, WRITE_ARTICLE_FAILUER] =
	createRequestActionTypes('articleEditor/WRITE_ARTICLE');
