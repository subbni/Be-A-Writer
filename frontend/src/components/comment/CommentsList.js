import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Profile from '../../images/Profile.svg';
import Kebab from '../../images/Kebab.svg';
import RecommentEditor from './RecommentEditor';
import RecommentRectangle from '../../images/RecommentRectangle.svg';
import { getTimeAgo } from '../../utils/dateUtils';
import CommentItem from './CommentItem';
import RecommentsList from './RecommentsList';
const CommentsListBlock = styled.div`
	/* border: 1px solid black; */
	font-size: 0.9rem;
`;

const CommentWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: start;
	align-items: center;
	/* padding: 0.6rem 0; */
`;

const CommentsList = ({
	comments,
	recomments,
	onCommentSubmit,
	onRecommentShow,
	currentUserId,
	onCommentDelete,
	onCommentModify,
}) => {
	const [replyingCommentId, setReplyingCommentId] = useState(null);
	// TODO : expandedCommentIds Set으로 만들기
	const [expandedCommentId, setExpandedCommentId] = useState([]);
	const [editingCommentId, setEditingCommentId] = useState(null);

	const onRecommentWriteBtnClick = (commentId) => {
		setReplyingCommentId(commentId);
	};

	const onRecommentShowBtnClick = (commentId) => {
		if (expandedCommentId.length > 0 && expandedCommentId.includes(commentId)) {
			setExpandedCommentId(expandedCommentId.filter((id) => id !== commentId));
		} else {
			setExpandedCommentId([...expandedCommentId, commentId]);
			onRecommentShow(commentId);
		}
	};

	const onRecommentCancelClick = () => {
		setReplyingCommentId(null);
	};

	const onCommentModifyClick = (commentId) => {
		setEditingCommentId(commentId);
	};

	const onCommentModifyCancelClick = () => {
		setEditingCommentId(null);
	};

	const onCommentModifyConfirmClick = (form) => {
		setEditingCommentId(null);
		onCommentModify(form);
	};

	useEffect(() => {
		setReplyingCommentId(null);
	}, [comments, recomments]);

	return (
		<CommentsListBlock>
			{comments &&
				comments.data.map((comment) => {
					return (
						<CommentWrapper
							className={`comment${comment.comment_id}-item`}
							key={`comment${comment.comment_id}`}
						>
							<CommentItem
								comment={comment}
								expandedCommentId={expandedCommentId}
								replyingCommentId={replyingCommentId}
								onCommentSubmit={onCommentSubmit}
								onRecommentShowBtnClick={onRecommentShowBtnClick}
								onRecommentWriteBtnClick={onRecommentWriteBtnClick}
								onRecommentCancleClick={onRecommentCancelClick}
								onCommentModifyClick={onCommentModifyClick}
								onCommentModifyCancelClick={onCommentModifyCancelClick}
								onCommentDelete={onCommentDelete}
								onCommentModifyConfirmClick={onCommentModifyConfirmClick}
								isAuthor={currentUserId === comment.member_id}
								isEditing={editingCommentId === comment.comment_id}
								isExpanded={expandedCommentId.includes(comment.comment_id)}
							/>
							{expandedCommentId.length > 0 && expandedCommentId.includes(comment.comment_id) ? (
								<RecommentsList
									comment={comment}
									recomments={recomments}
									expandedCommentId={expandedCommentId}
									replyingCommentId={replyingCommentId}
									editingCommentId={editingCommentId}
									onCommentSubmit={onCommentSubmit}
									onRecommentWriteBtnClick={onRecommentWriteBtnClick}
									onRecommentShowBtnClick={onRecommentShowBtnClick}
									onRecommentCancleClick={onRecommentCancelClick}
									onCommentModifyClick={onCommentModifyClick}
									onCommentModifyCancelClick={onCommentModifyCancelClick}
									onCommentDelete={onCommentDelete}
									onCommentModifyConfirmClick={onCommentModifyConfirmClick}
									currentUserId={currentUserId}
									isAuthor={currentUserId === comment.member_id}
									isEditing={editingCommentId === comment.comment_id}
								/>
							) : null}
						</CommentWrapper>
					);
				})}
		</CommentsListBlock>
	);
};

export default CommentsList;
