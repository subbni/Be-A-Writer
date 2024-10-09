import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Profile from '../../images/Profile.svg';
import RecommentEditor from './RecommentEditor';
import RecommentRectangle from '../../images/RecommentRectangle.svg';
import { getTimeAgo } from '../../utils/dateUtils';

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

const CommentItemStyled = styled.div`
	width: 100%;
	border-bottom: 1.5px solid var(--color-light-gray);
	display: flex;
	flex-direction: row;
	justify-content: start;
	align-items: start;
	padding: 0.6rem 0;
	& > * {
		padding-left: 0.5rem;
	}
	&.recomment {
		background-color: var(--color-light-background);
		/* align-items: center; */
		border-bottom: 1px solid var(--color-light-gray);
		margin: 0 0.5rem;
	}
`;

const ProfileImage = styled.img`
	width: 35px;
	height: 35px;
`;

const CommentData = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: start;
	align-items: start;
	padding-top: 0.35rem;
	.content {
		padding: 0.75rem 0;
	}
	.date_info {
		font-size: 0.8rem;
		color: var(--color-dark-gray);
		padding-left: 0.25rem;
	}
`;

const RecommentShowBtn = styled.button`
	all: unset;
	color: var(--color-point);
	cursor: pointer;
	font-weight: 600;
	font-size: 0.8rem;
	padding: 0.25rem;
	border-radius: 10px;
	&:hover {
		background-color: aliceblue;
	}
`;

const RecommentWriteBtn = styled.button`
	all: unset;
	color: var(--color-gray);
	cursor: pointer;
	font-size: 0.8rem;
	padding-right: 1rem;
	&:hover {
		text-decoration: underline;
	}
`;

const RecommentIcon = styled.img`
	margin: 0.5rem;
`;

const RecommentWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: start;
	align-items: center;
`;

const CommentItem = ({
	comment,
	onRecommentWriteBtnClick,
	replyingCommentId,
	onRecommentShowBtnClick,
	expandedCommentId,
	isRecomment,
	onCommentSubmit,
	onRecommentCancleClick,
}) => {
	return (
		<>
			<CommentItemStyled key={`comment${comment.comment_id}`}>
				{isRecomment && <RecommentIcon src={RecommentRectangle} />}
				<ProfileImage src={Profile} alt="profile image" />
				<CommentData>
					<div className="nickname">
						{comment.member_nickname}
						<span className="date_info">
							{getTimeAgo(comment.created_at)}
							{comment.created_at !== comment.updated_at && `(수정됨)`}
						</span>
					</div>
					<div className="content">{comment.content}</div>
					<div className="recomment_info">
						<RecommentWriteBtn onClick={() => onRecommentWriteBtnClick(comment.comment_id)}>
							{replyingCommentId === comment.comment_id ? '답글 다는 중' : '답글'}
						</RecommentWriteBtn>
						{comment.recomment_count > 0 && (
							<RecommentShowBtn onClick={() => onRecommentShowBtnClick(comment.comment_id)}>
								• 답글 {comment.recomment_count}개
							</RecommentShowBtn>
						)}
					</div>
				</CommentData>
			</CommentItemStyled>
			{replyingCommentId === comment.comment_id && (
				<RecommentEditor
					articleId={comment.article_id}
					parentId={comment.parent_id || comment.comment_id}
					mentionMemberId={comment.member_id}
					mentionMemberNickname={comment.member_nickname}
					onCommentSubmit={onCommentSubmit}
					onRecommentCancleClick={onRecommentCancleClick}
				/>
			)}
		</>
	);
};

const RecommentsList = ({
	recomments,
	comment,
	expandedCommentId,
	replyingCommentId,
	onRecommentWriteBtnClick,
	onRecommentShowBtnClick,
	onRecommentCancleClick,
	onCommentSubmit,
}) => {
	return (
		<RecommentWrapper>
			{recomments[comment.comment_id]
				?.filter((recomment) => recomment.parent_id === comment.comment_id)
				.map((recomment) => {
					return (
						<>
							<CommentItem
								comment={recomment}
								isRecomment={true}
								onRecommentWriteBtnClick={onRecommentWriteBtnClick}
								replyingCommentId={replyingCommentId}
								onRecommentShowBtnClick={onRecommentShowBtnClick}
								expandedCommentId={expandedCommentId}
								onCommentSubmit={onCommentSubmit}
								onRecommentCancleClick={onRecommentCancleClick}
							/>
						</>
					);
				})}
		</RecommentWrapper>
	);
};

const CommentsList = ({ comments, recomments, onCommentSubmit, onRecommentShow }) => {
	const [replyingCommentId, setReplyingCommentId] = useState(null);
	const [expandedCommentId, setExpandedCommentId] = useState([]);

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

	const onRecommentCancleClick = () => {
		setReplyingCommentId(null);
	};

	useEffect(() => {
		setReplyingCommentId(null);
	}, [comments, recomments]);

	return (
		<CommentsListBlock>
			{comments &&
				comments.data.map((comment) => {
					return (
						<CommentWrapper key={`comment${comment.comment_id}`}>
							<CommentItem
								comment={comment}
								expandedCommentId={expandedCommentId}
								replyingCommentId={replyingCommentId}
								onCommentSubmit={onCommentSubmit}
								onRecommentShowBtnClick={onRecommentShowBtnClick}
								onRecommentWriteBtnClick={onRecommentWriteBtnClick}
								onRecommentCancleClick={onRecommentCancleClick}
							/>
							{expandedCommentId.length > 0 && expandedCommentId.includes(comment.comment_id) ? (
								<RecommentsList
									comment={comment}
									recomments={recomments}
									expandedCommentId={expandedCommentId}
									replyingCommentId={replyingCommentId}
									onCommentSubmit={onCommentSubmit}
									onRecommentWriteBtnClick={onRecommentWriteBtnClick}
									onRecommentShowBtnClick={onRecommentShowBtnClick}
									onRecommentCancleClick={onRecommentCancleClick}
								/>
							) : null}
						</CommentWrapper>
					);
				})}
		</CommentsListBlock>
	);
};

export default CommentsList;
