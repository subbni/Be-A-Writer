import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Editor from '../../components/article/Editor';
import { useDispatch, useSelector } from 'react-redux';
import {
	changeField,
	initialize,
	writeArticle,
	modifyArticle,
} from '../../modules/article/editor/articleEditorActions';

const EditorContainer = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { title, subtitle, content, article, articleError, originalArticle } = useSelector(
		({ articleEditor }) => ({
			title: articleEditor.title,
			subtitle: articleEditor.subtitle,
			content: articleEditor.content,
			article: articleEditor.article,
			articleError: articleEditor.articleError,
			originalArticle: articleEditor.originalArticle,
		}),
	);

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
				}),
			);
		} else {
			dispatch(
				writeArticle({
					title,
					subtitle,
					content,
				}),
			);
		}
	};

	useEffect(() => {
		if (!originalArticle) {
			dispatch(initialize());
		}
	}, [dispatch, originalArticle]);

	useEffect(() => {
		if (article) {
			const { article_id } = article;
			dispatch(initialize());
			navigate(`/article/${article_id}`);
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
			onChangeField={onChangeField}
			onPublish={onPublish}
			error={articleError}
			originalArticle={originalArticle}
		/>
	);
};

export default EditorContainer;
