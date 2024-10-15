import styled from 'styled-components';
import CommentItem from './CommentItem';

const RecommentWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: start;
	align-items: center;
`;

const RecommentsList = ({
	recomments,
	comment,
	expandedCommentId,
	replyingCommentId,
	editingCommentId,
	onRecommentWriteBtnClick,
	onRecommentShowBtnClick,
	onRecommentCancelClick,
	onCommentSubmit,
	currentUserId,
	onCommentModifyClick,
	onDeleteClick,
	onCommentModifyCancelClick,
	onCommentModifyConfirmClick,
	onCommentMenuClick,
}) => {
	return (
		<RecommentWrapper>
			{recomments[comment.comment_id]
				?.filter((recomment) => recomment.parent_id === comment.comment_id)
				.map((recomment) => {
					return (
						<>
							<CommentItem
								className={`comment${recomment.comment_id}-item .recomment`}
								key={`comment${recomment.comment_id}`}
								comment={recomment}
								isRecomment={true}
								onRecommentWriteBtnClick={onRecommentWriteBtnClick}
								replyingCommentId={replyingCommentId}
								onRecommentShowBtnClick={onRecommentShowBtnClick}
								expandedCommentId={expandedCommentId}
								onCommentSubmit={onCommentSubmit}
								onRecommentCancleClick={onRecommentCancelClick}
								isAuthor={currentUserId === recomment.member_id}
								isEditing={editingCommentId === recomment.comment_id}
								onDeleteClick={onDeleteClick}
								onCommentModifyClick={onCommentModifyClick}
								onCommentModifyCancelClick={onCommentModifyCancelClick}
								onCommentModifyConfirmClick={onCommentModifyConfirmClick}
								onCommentMenuClick={onCommentMenuClick}
							/>
						</>
					);
				})}
		</RecommentWrapper>
	);
};

export default RecommentsList;
