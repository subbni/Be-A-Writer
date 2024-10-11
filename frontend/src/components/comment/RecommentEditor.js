import React, { useState } from 'react';
import styled from 'styled-components';
import RecommentRectangle from '../../images/RecommentRectangle.svg';

const RecommentEditorBlock = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: end;
	width: 100%;
	background-color: var(--color-light-background);
	border-bottom: 1.5px solid var(--color-light-gray);
	padding: 1rem 0;
	padding-right: 1.5rem;
`;
const RecommentInput = styled.textarea`
	width: 94%;
	height: 5.5rem;
	margin-bottom: 1rem;
	border: 1px solid var(--color-gray);
	border-radius: 5px;
	resize: none;
	padding: 1rem;
	font-family: var(--font-family-default);
	&:focus {
		outline: none;
		border: 1.5px solid var(--color-gray);
	}
`;

const RecommentButtonWrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: end;
`;

const RecommentStyledBtn = styled.button`
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

const RecommentIcon = styled.img`
	position: absolute;
	left: 1rem;
	top: 10%;
`;

const RecommentEditor = ({
	articleId,
	parentId,
	mentionMemberId,
	mentionMemberNickname,
	onCommentSubmit,
	onRecommentCancleClick,
}) => {
	const [form, setForm] = useState({
		article_id: articleId,
		content: '',
		parent_id: parentId,
		mention_member_id: mentionMemberId,
	});

	const onRecommentChange = (e) => {
		setForm({
			...form,
			content: e.target.value,
		});
	};

	const onRecommentSubmitBtnClick = (e) => {
		if (form.content !== '') {
			onCommentSubmit(form);
			form.content = '';
		} else {
			window.alert('댓글 내용을 작성해주세요.');
		}
		form.content = '';
	};
	return (
		<RecommentEditorBlock>
			<RecommentIcon src={RecommentRectangle} />
			<RecommentInput
				placeholder={`${mentionMemberNickname}님에게 답글 쓰기`}
				onChange={onRecommentChange}
				value={form.content}
			/>
			<RecommentButtonWrapper>
				<RecommentStyledBtn onClick={onRecommentCancleClick}>취소</RecommentStyledBtn>
				<RecommentStyledBtn onClick={onRecommentSubmitBtnClick}>작성</RecommentStyledBtn>
			</RecommentButtonWrapper>
		</RecommentEditorBlock>
	);
};

export default RecommentEditor;
