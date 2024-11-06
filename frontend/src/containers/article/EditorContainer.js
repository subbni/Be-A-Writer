import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Editor from '../../components/article/Editor';
import { useDispatch, useSelector } from 'react-redux';
import {
	changeField,
	initialize,
	writeArticle,
	modifyArticle,
} from '../../modules/editor/articleEditorActions';

const EditorContainer = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const title = useSelector((state) => state.articleEditor.title);
	const subtitle = useSelector((state) => state.articleEditor.subtitle);
	const content = useSelector((state) => state.articleEditor.content);
	const is_public = useSelector((state) => state.articleEditor.is_public);
	const article = useSelector((state) => state.articleEditor.article);
	const articleError = useSelector((state) => state.articleEditor.articleError);
	const originalArticle = useSelector((state) => state.articleEditor.originalArticle);

	const onChangeField = useCallback((payload) => dispatch(changeField(payload)), [dispatch]);

	// TODO : 빈 내용 : <p> </p> 혹은 <p><br/></p> 처리
	const onPublish = () => {
		if (originalArticle) {
			dispatch(
				modifyArticle({
					articleId: originalArticle.article_id,
					title,
					subtitle,
					content,
					is_public,
				}),
			);
		} else {
			dispatch(
				writeArticle({
					title,
					subtitle,
					content,
					is_public,
				}),
			);
		}
	};

	useEffect(() => {
		return () => {
			dispatch(initialize());
		};
	}, []);

	useEffect(() => {
		if (!originalArticle) {
			dispatch(initialize());
		}
	}, [dispatch, originalArticle]);

	useEffect(() => {
		if (article) {
			const { article_id } = article;
			dispatch(initialize());
			navigate(`/article/${article_id}`, { replace: true });
		}
		if (articleError) {
			console.log(articleError);
		}
	}, [article, articleError, navigate, dispatch]);

	return (
		<Editor
			title={title}
			subtitle={subtitle}
			content={content}
			is_public={is_public}
			onChangeField={onChangeField}
			onPublish={onPublish}
			error={articleError}
			originalArticle={originalArticle}
		/>
	);
};

export default EditorContainer;
