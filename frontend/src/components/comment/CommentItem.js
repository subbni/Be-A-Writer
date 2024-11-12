import { useState } from 'react';
import styled, { css } from 'styled-components';
import { getTimeAgo } from '../../utils/dateUtils';
import DefaultProfile from '../../images/Profile.svg';
import Kebab from '../../images/Kebab.svg';
import RecommentEditor from './RecommentEditor';
import RecommentRectangle from '../../images/RecommentRectangle.svg';
import { Link } from 'react-router-dom';
import { PROFILE_PAGE } from '../../constants/pagePaths';

const CommentItemStyled = styled.div`
	position: relative;
	width: 100%;
	border-bottom: 1.5px solid var(--color-light-gray);
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: start;
	padding: 0.6rem 0;
	&.recomment {
		background-color: var(--color-light-background);
		border-bottom: 1px solid var(--color-light-gray);
	}
	.left {
		display: flex;
		flex-direction: row;
		justify-content: start;
		align-items: start;
		& > * {
			margin-left: 0.5rem;
		}
	}
	.right {
		position: relative;
		.menu {
			padding-left: 1rem;
			padding-top: 0.35rem;
			cursor: pointer;
		}
	}
	&.editing {
		.left {
			width: 100%;
		}
	}
`;

const ProfileImageDiv = styled.div`
	width: 25px;
	height: 25px;
	border-radius: 30px;
`;
const ProfileImage = styled.img`
	/* padding: 0.125rem; */
	/* display: block; */
	width: 25px;
	height: 25px;
	border-radius: 30px;
	object-fit: cover;
`;

const CommentData = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: start;
	align-items: start;
	/* padding-top: 0.35rem; */
	width: 100%;
	margin-right: 1rem;
	.content {
		padding: 0.75rem 0;
	}
	.date_info {
		font-size: 0.8rem;
		color: var(--color-dark-gray);
		padding-left: 0.5rem;
	}
	.deletedMsg {
		color: var(--color-gray);
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
	margin-top: 0.2rem;
`;

const MenuDropdown = styled.div`
	display: none;
	&.clicked {
		position: absolute;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: white;
		width: 110px;
		right: 0;
		border-radius: 2px;
		border: 1px solid var(--color-gray);
	}
`;

const MenuDropdownItem = styled.div`
	width: 108px;
	height: 30px;
	line-height: 30px;
	font-size: 15px;
	text-align: center;
	cursor: pointer;
	color: var(--color-dark-gray);
	&:not(:last-child) {
		border-bottom: 1px solid var(--color-gray);
	}
	&:hover {
		background-color: var(--color-light-gray);
	}
`;

const CommentModifyInput = styled.textarea`
	width: 100%;
	min-height: 3.5rem;
	border: 1px solid var(--color-gray);
	border-radius: 5px;
	resize: none;
	padding: 0.5rem;
	margin: 0.5rem 0;
	font-family: var(--font-family-default);
	&:focus {
		outline: none;
		border: 1.5px solid var(--color-gray);
	}
`;

const CommentModifyButtonWrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: end;
	width: 100%;
`;

const CommentModifyStyledBtn = styled.button`
	width: 60px;
	height: 30px;
	border: 1px solid var(--color-gray);
	border-radius: 5px;
	background-color: white;
	color: var(--color-dark-gray);
	margin-left: 0.5rem;
	&:hover {
		cursor: pointer;
		background-color: var(--color-light-gray);
	}
`;

const CommentItem = ({
	comment,
	onRecommentWriteBtnClick,
	replyingCommentId,
	onRecommentShowBtnClick,
	isRecomment,
	onCommentSubmit,
	onRecommentCancleClick,
	onCommentModifyClick,
	onCommentModifyCancelClick,
	onDeleteClick,
	onCommentModifyConfirmClick,
	onCommentMenuClick,
	isAuthor,
	isEditing,
	isExpanded,
}) => {
	const [content, setContent] = useState(comment.content);

	const onContentChange = (e) => {
		setContent(e.target.value);
	};

	return (
		<>
			{isEditing ? (
				<CommentItemStyled
					className={`comment${comment.commentId} editing`}
					key={`comment${comment.commentId}`}
				>
					<div className="left">
						{isRecomment && <RecommentIcon src={RecommentRectangle} />}
						<ProfileImageDiv>
							<ProfileImage src={comment.memberProfileUrl || DefaultProfile} alt="profile image" />
						</ProfileImageDiv>
						<CommentData>
							<div className="nickname">
								{comment.memberNickname}
								<span className="date_info">
									{getTimeAgo(comment.createdAt)}
									{comment.createdAt !== comment.updatedAt && `(수정됨)`}
								</span>
							</div>
							<CommentModifyInput value={content} onChange={onContentChange} />

							<CommentModifyButtonWrapper>
								<CommentModifyStyledBtn onClick={onCommentModifyCancelClick}>
									취소
								</CommentModifyStyledBtn>
								<CommentModifyStyledBtn
									onClick={() =>
										onCommentModifyConfirmClick({ commentId: comment.commentId, content: content })
									}
								>
									수정
								</CommentModifyStyledBtn>
							</CommentModifyButtonWrapper>
						</CommentData>
					</div>
				</CommentItemStyled>
			) : (
				<CommentItemStyled
					className={`comment${comment.commentId}`}
					key={`comment${comment.commentId}`}
				>
					<div className="left">
						{isRecomment && <RecommentIcon src={RecommentRectangle} />}
						<ProfileImageDiv>
							<ProfileImage src={comment.memberProfileUrl || DefaultProfile} alt="profile image" />
						</ProfileImageDiv>
						{comment.deleted ? (
							<CommentData>
								<div className="nickname">{comment.memberNickname}</div>
								<div className="content deletedMsg">삭제된 댓글입니다.</div>
								<div className="recomment_info">
									<RecommentWriteBtn onClick={() => onRecommentWriteBtnClick(comment.commentId)}>
										{replyingCommentId === comment.commentId ? '답글 다는 중' : '답글'}
									</RecommentWriteBtn>
									{comment.recommentCount > 0 && (
										<RecommentShowBtn onClick={() => onRecommentShowBtnClick(comment.commentId)}>
											{isExpanded ? '닫기' : `	• 답글 ${comment.recommentCount}개`}
										</RecommentShowBtn>
									)}
								</div>
							</CommentData>
						) : (
							<CommentData>
								<div className="nickname">
									<Link to={PROFILE_PAGE + `${comment.memberId}`}>{comment.memberNickname}</Link>
									<span className="date_info">
										{getTimeAgo(comment.createdAt)}
										{comment.createdAt !== comment.updatedAt && `(수정됨)`}
									</span>
								</div>
								<div className="content">{comment.content}</div>
								<div className="recomment_info">
									<RecommentWriteBtn onClick={() => onRecommentWriteBtnClick(comment.commentId)}>
										{replyingCommentId === comment.commentId ? '답글 다는 중' : '답글'}
									</RecommentWriteBtn>
									{comment.recommentCount > 0 && (
										<RecommentShowBtn onClick={() => onRecommentShowBtnClick(comment.commentId)}>
											{isExpanded ? '닫기' : `	• 답글 ${comment.recommentCount}개`}
										</RecommentShowBtn>
									)}
								</div>
							</CommentData>
						)}
					</div>
					{isAuthor && !comment.deleted && (
						<div className="right">
							<img
								className="menu"
								src={Kebab}
								alt="menu"
								onClick={() => onCommentMenuClick(comment.commentId)}
							/>
							<MenuDropdown className={`comment${comment.commentId}_menu-dropdown`}>
								<MenuDropdownItem
									className="modify"
									onClick={() => onCommentModifyClick(comment.commentId)}
								>
									수정하기
								</MenuDropdownItem>
								<MenuDropdownItem className="delete" onClick={onDeleteClick}>
									삭제하기
								</MenuDropdownItem>
							</MenuDropdown>
						</div>
					)}
				</CommentItemStyled>
			)}
			{replyingCommentId === comment.commentId && (
				<RecommentEditor
					articleId={comment.articleId}
					parentId={comment.parentId || comment.commentId}
					mentionMemberId={comment.memberId}
					mentionMemberNickname={comment.memberNickname}
					onCommentSubmit={onCommentSubmit}
					onRecommentCancleClick={onRecommentCancleClick}
				/>
			)}
		</>
	);
};

export default CommentItem;
