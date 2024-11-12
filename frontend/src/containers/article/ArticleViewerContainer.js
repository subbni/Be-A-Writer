import React, { useEffect, useState } from 'react';
import ArticleViewer from '../../components/article/ArticleViewer';
import { useDispatch, useSelector } from 'react-redux';
import { deleteArticle, readArticle, unloadArticle } from '../../modules/articles/articlesActions';
import { useNavigate, useParams } from 'react-router-dom';
import AskModal from '../../components/common/AskModal';
import { setOriginalArticle } from '../../modules/editor/articleEditorActions';
import { ARTICLE_WRITE_PAGE } from '../../constants/pagePaths';

const ArticleViewerContainer = () => {
	const [modal, setModal] = useState(false);
	const { articleId } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const article = useSelector((state) => state.articles.article);
	const error = useSelector((state) => state.articles.error);
	const loading = useSelector((state) => state.loading['articles/READ_ARTICLE']);
	const user = useSelector((state) => state.user.user);
	const deleted = useSelector((state) => state.articles.deleted);

	const onDeleteClick = () => {
		setModal(true);
	};

	const onDeleteConfirm = async () => {
		setModal(false);
		onDelete();
	};

	const onDeleteCancel = () => {
		setModal(false);
	};

	const onDelete = async () => {
		try {
			dispatch(deleteArticle(article.articleId));
			navigate(-1);
		} catch (e) {
			console.log(e);
		}
	};

	const onModify = () => {
		dispatch(setOriginalArticle(article));
		navigate(ARTICLE_WRITE_PAGE);
	};

	useEffect(() => {
		dispatch(readArticle(articleId));
		return () => {
			// 언마운트될 때
			dispatch(unloadArticle());
		};
	}, [dispatch, articleId]);

	useEffect(() => {
		if (deleted) {
			navigate('/my');
		}
	}, [deleted, navigate]);
	const isAuthor = (user && user.memberId) === (article && article.authorId);

	return (
		<>
			<ArticleViewer
				article={article}
				error={error}
				loading={loading}
				onDeleteClick={onDeleteClick}
				onModifyClick={onModify}
				isAuthor={isAuthor}
			/>
			<AskModal
				visible={modal}
				title="작성글 삭제"
				description="이 글을 정말 삭제하시겠습니까?"
				confirmText="삭제"
				onConfirm={onDeleteConfirm}
				onCancel={onDeleteCancel}
			/>
		</>
	);
};

export default ArticleViewerContainer;
