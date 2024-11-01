import React, { useEffect, useState } from 'react';
import CommentsViewer from '../../components/comment/CommentsViewer';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	deleteComment,
	modifyComment,
	readComments,
	readRecomments,
	writeComment,
} from '../../modules/comment/commentActions';
import CommentsList from '../comment/CommentsList';
import CommentEditor from '../../components/comment/CommentEditor';
import PaginationBar from '../../components/pagination/PaginationBar';

const CommentViewerContainer = () => {
	const { articleId } = useParams();
	const limit = 10;
	const dispatch = useDispatch();

	const comments = useSelector((state) => state.comments.comments);
	const addedComment = useSelector((state) => state.comments.addedComment);
	const deletedComment = useSelector((state) => state.comments.deletedComment);
	const error = useSelector((state) => state.comments.error);
	const loading = useSelector((state) => state.loading['comment/READ_COMMENTS']);

	const [page, setPage] = useState(1);

	useEffect(() => {
		dispatch(
			readComments({
				articleId,
				page,
				limit,
			}),
		);
	}, [dispatch, page, articleId]);

	useEffect(() => {
		if (addedComment !== null) {
			dispatch(
				readComments({
					articleId,
					page,
					limit,
				}),
			);
			if (addedComment.data.parent_id !== null) {
				dispatch(readRecomments(addedComment.data.parent_id));
			}
		}
	}, [addedComment, dispatch]);

	useEffect(() => {
		if (deletedComment !== null) {
			dispatch(
				readComments({
					articleId,
					page,
					limit,
				}),
			);
			if (deletedComment.data.parent_id !== null) {
				dispatch(readRecomments(deletedComment.data.parent_id));
			}
		}
	}, [deletedComment, dispatch]);

	const onCommentSubmit = (form) => {
		dispatch(writeComment(form));
	};

	const onRecommentShow = (commentId) => {
		dispatch(readRecomments(commentId));
	};

	const onCommentDelete = (commentId) => {
		dispatch(deleteComment(commentId));
	};

	const onCommentModify = (form) => {
		dispatch(modifyComment(form));
	};

	const onPageChange = (page) => {
		setPage(page);
	};

	return (
		<CommentsViewer comments={comments}>
			<CommentsList
				onCommentSubmit={onCommentSubmit}
				onRecommentShow={onRecommentShow}
				onCommentDelete={onCommentDelete}
				onCommentModify={onCommentModify}
			/>
			<PaginationBar
				totalItemCnt={comments?.parentCount.count}
				onPageChange={onPageChange}
				currentPage={page}
				itemCntPerPage={limit}
			/>
			<CommentEditor articleId={articleId} onCommentSubmit={onCommentSubmit} />
		</CommentsViewer>
	);
};

export default CommentViewerContainer;
