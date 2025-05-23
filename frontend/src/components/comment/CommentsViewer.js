import React from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';

const CommentsViewerBlock = styled(Responsive)`
	/* border: 1px solid black; */
	padding: 0 10rem;
	padding-bottom: 5rem;
	max-width: 1300px;
`;

const CommentsInfo = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	font-size: 0.9rem;
	padding-bottom: 1rem;
	border-bottom: 1px solid var(--color-gray);
	margin-bottom: 0.5rem;
	.write_comment {
		font-weight: 500;
		cursor: pointer;
	}
`;

const CommentsViewer = ({ children, comments }) => {
	return (
		<CommentsViewerBlock>
			<CommentsInfo>
				<div className="comments_count">댓글 {comments?.totalCount.count}개</div>
				<div className="write_comment">댓글 쓰기</div>
			</CommentsInfo>
			{children}
		</CommentsViewerBlock>
	);
};

export default CommentsViewer;
