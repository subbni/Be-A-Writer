import React, { useEffect, useState } from 'react';
import CommentsViewer from '../../components/comment/CommentsViewer';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { readComments, readRecomments, writeComment } from '../../modules/comment/commentActions';

const CommentViewerContainer = () => {
	const { articleId } = useParams();
	const limit = 50;
	const dispatch = useDispatch();

	const comments = useSelector((state) => state.comments.comments);
	const recomments = useSelector((state) => state.comments.recomments);
	const addedComment = useSelector((state) => state.comments.addedComment);
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
			if (addedComment.result.parent_id !== null) {
				dispatch(readRecomments(addedComment.result.parent_id));
			}
		}
	}, [addedComment, dispatch]);

	const onCommentSubmit = (form) => {
		console.log(form);
		dispatch(writeComment(form));
	};

	const onRecommentShow = (commentId) => {
		console.log(commentId);
		dispatch(readRecomments(commentId));
	};

	return (
		<CommentsViewer
			articleId={articleId}
			comments={comments}
			recomments={recomments}
			onCommentSubmit={onCommentSubmit}
			onRecommentShow={onRecommentShow}
		/>
	);
};

export default CommentViewerContainer;
