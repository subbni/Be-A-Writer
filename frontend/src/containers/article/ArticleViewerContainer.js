import React, { useEffect, useState } from 'react';
import ArticleViewer from '../../components/article/ArticleViewer';
import { useDispatch, useSelector } from 'react-redux';
import {
	deleteArticle,
	readArticle,
	unloadArticle,
} from '../../modules/article/articles/articlesActions';
import { useNavigate, useParams } from 'react-router-dom';
import AskModal from '../../components/common/AskModal';
import { setOriginalArticle } from '../../modules/article/editor/articleEditorActions';

const ArticleViewerContainer = () => {
	const [modal, setModal] = useState(false);
	const { articleId } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { article, error, loading, user, deleted } = useSelector(({ articles, loading, user }) => ({
		article: articles.article,
		error: articles.error,
		loading: loading['articles/READ_ARTICLE'],
		user: user.user,
		deleted: articles.deleted,
	}));

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
			dispatch(deleteArticle(article.article_id));
		} catch (e) {
			console.log(e);
		}
	};

	const onModify = () => {
		dispatch(setOriginalArticle(article));
		navigate('/write');
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
	const author = (user && user.member_id) === (article && article.author_id);

	return (
		<>
			<ArticleViewer
				article={article}
				error={error}
				loading={loading}
				onDeleteClick={onDeleteClick}
				onModifyClick={onModify}
				author={author}
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
