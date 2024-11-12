import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CommentItem from '../../components/comment/CommentItem';
import RecommentsList from '../../components/comment/RecommentsList';
import { useSelector } from 'react-redux';
import AskModal from '../../components/common/AskModal';
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

const CommentsList = ({ onCommentSubmit, onRecommentShow, onCommentDelete, onCommentModify }) => {
	const currentUserId = useSelector((state) => state.user.user.memberId);
	const comments = useSelector((state) => state.comments.comments);
	const recomments = useSelector((state) => state.comments.recomments);
	const [replyingCommentId, setReplyingCommentId] = useState(null);
	// TODO : expandedCommentIds Set으로 만들기
	const [expandedCommentId, setExpandedCommentId] = useState([]);
	const [editingCommentId, setEditingCommentId] = useState(null);
	const [menuClickedCommentId, setMenuClickedCommentId] = useState(null);

	const [modal, setModal] = useState(false);

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

	const onCommentMenuClick = (commentId) => {
		if (menuClickedCommentId !== null) {
			const menuDropdown = document.querySelector(`.comment${menuClickedCommentId}_menu-dropdown`);
			menuDropdown.classList.toggle('clicked');
		}
		if (commentId === menuClickedCommentId) {
			setMenuClickedCommentId(null);
		} else {
			setMenuClickedCommentId(commentId);
		}
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

	const onDeleteClick = () => {
		setModal(true);
	};

	const onDeleteCancel = () => {
		setModal(false);
	};

	const onDeleteConfirm = () => {
		onCommentDelete(menuClickedCommentId);
		setModal(false);
		setMenuClickedCommentId(null);
	};

	useEffect(() => {
		setReplyingCommentId(null);
	}, [comments, recomments]);

	useEffect(() => {
		if (menuClickedCommentId !== null) {
			const menuDropdown = document.querySelector(`.comment${menuClickedCommentId}_menu-dropdown`);
			menuDropdown.classList.toggle('clicked');
		}
	}, [menuClickedCommentId]);

	return (
		<CommentsListBlock>
			{comments &&
				comments.data.map((comment) => {
					return (
						<CommentWrapper
							className={`comment${comment.commentId}-item`}
							key={`comment${comment.commentId}`}
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
								onDeleteClick={onDeleteClick}
								onCommentModifyConfirmClick={onCommentModifyConfirmClick}
								onCommentMenuClick={onCommentMenuClick}
								isAuthor={currentUserId === comment.memberId}
								isEditing={editingCommentId === comment.commentId}
								isExpanded={expandedCommentId.includes(comment.commentId)}
							/>
							{expandedCommentId.length > 0 && expandedCommentId.includes(comment.commentId) ? (
								<RecommentsList
									comment={comment}
									recomments={recomments}
									expandedCommentId={expandedCommentId}
									replyingCommentId={replyingCommentId}
									editingCommentId={editingCommentId}
									onCommentSubmit={onCommentSubmit}
									onCommentMenuClick={onCommentMenuClick}
									onRecommentWriteBtnClick={onRecommentWriteBtnClick}
									onRecommentShowBtnClick={onRecommentShowBtnClick}
									onRecommentCancelClick={onRecommentCancelClick}
									onCommentModifyClick={onCommentModifyClick}
									onCommentModifyCancelClick={onCommentModifyCancelClick}
									onDeleteClick={onDeleteClick}
									onCommentModifyConfirmClick={onCommentModifyConfirmClick}
									currentUserId={currentUserId}
									isAuthor={currentUserId === comment.memberId}
									isEditing={editingCommentId === comment.commentId}
								/>
							) : null}
						</CommentWrapper>
					);
				})}
			<AskModal
				visible={modal}
				title="댓글 삭제"
				description="이 댓글을 정말 삭제하시겠습니까?"
				confirmText="삭제"
				onConfirm={onDeleteConfirm}
				onCancel={onDeleteCancel}
			/>
		</CommentsListBlock>
	);
};

export default CommentsList;
