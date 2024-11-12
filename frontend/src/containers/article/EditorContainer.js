import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
	const isPublic = useSelector((state) => state.articleEditor.isPublic);
	const article = useSelector((state) => state.articleEditor.article);
	const articleError = useSelector((state) => state.articleEditor.articleError);
	const originalArticle = useSelector((state) => state.articleEditor.originalArticle);

	const onChangeField = useCallback((payload) => dispatch(changeField(payload)), [dispatch]);

	// TODO : 빈 내용 : <p> </p> 혹은 <p><br/></p> 처리
	const onPublish = () => {
		if (originalArticle) {
			dispatch(
				modifyArticle({
					articleId: originalArticle.articleId,
					title,
					subtitle,
					content,
					isPublic,
				}),
			);
		} else {
			dispatch(
				writeArticle({
					title,
					subtitle,
					content,
					isPublic,
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
			const { articleId } = article;
			dispatch(initialize());
			navigate(`/article/${articleId}`, { replace: true });
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
			isPublic={isPublic}
			onChangeField={onChangeField}
			onPublish={onPublish}
			error={articleError}
			originalArticle={originalArticle}
		/>
	);
};

export default EditorContainer;
