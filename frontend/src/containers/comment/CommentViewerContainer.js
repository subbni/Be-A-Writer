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
import CommentsList from '../../components/comment/CommentsList';
import CommentEditor from '../../components/comment/CommentEditor';

const CommentViewerContainer = () => {
	const { articleId } = useParams();
	const limit = 50;
	const dispatch = useDispatch();

	const comments = useSelector((state) => state.comments.comments);
	const recomments = useSelector((state) => state.comments.recomments);
	const addedComment = useSelector((state) => state.comments.addedComment);
	const deletedComment = useSelector((state) => state.comments.deletedComment);
	const error = useSelector((state) => state.comments.error);
	const loading = useSelector((state) => state.loading['comment/READ_COMMENTS']);
	const currentUserId = useSelector((state) => state.user.user.member_id);

	const [page, setPage] = useState(1);

	useEffect(() => {
		dispatch(
			readComments({
				articleId,
				page,
				limit,
			}),
		);
	}, [dispatch, limit, page, articleId]);

	useEffect(() => {
		dispatch(
			readComments({
				articleId,
				page,
				limit,
			}),
		);
		if (addedComment !== null) {
			if (addedComment.data.parent_id !== null) {
				dispatch(readRecomments(addedComment.data.parent_id));
			}
		}
	}, [addedComment, dispatch]);

	useEffect(() => {
		dispatch(
			readComments({
				articleId,
				page,
				limit,
			}),
		);
		if (deletedComment !== null) {
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

	return (
		<CommentsViewer
			articleId={articleId}
			comments={comments}
			recomments={recomments}
			onCommentSubmit={onCommentSubmit}
			onRecommentShow={onRecommentShow}
		>
			<CommentsList
				comments={comments}
				recomments={recomments}
				onCommentSubmit={onCommentSubmit}
				onRecommentShow={onRecommentShow}
				onCommentDelete={onCommentDelete}
				onCommentModify={onCommentModify}
				currentUserId={currentUserId}
			/>
			<CommentEditor articleId={articleId} onCommentSubmit={onCommentSubmit} />
		</CommentsViewer>
	);
};

export default CommentViewerContainer;
