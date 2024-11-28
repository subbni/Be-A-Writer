import React, { useState } from 'react';
import styled from 'styled-components';

const CommentEditorBlock = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: end;
	padding-top: 1rem;
	margin-top: 2rem;
	/* border-top: 1.5px solid var(--color-gray); */
`;
const CommentInput = styled.textarea`
	width: 100%;
	height: 5.5rem;
	margin: 1rem 0;
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
const CommentSubmitBtn = styled.button`
	width: 60px;
	height: 30px;
	border: 1px solid var(--color-gray);
	border-radius: 5px;
	background-color: white;
	color: var(--color-dark-gray);
	cursor: pointer;
	&:hover {
		background-color: var(--color-light-gray);
	}
`;

const CommentEditor = ({ articleId, onCommentSubmit }) => {
	const [form, setForm] = useState({
		articleId: articleId,
		content: '',
		parentId: null,
		mentionMemberId: null,
	});
	const onCommentChange = (e) => {
		setForm({
			...form,
			content: e.target.value,
		});
	};

	const onCommentSubmitBtnClick = (e) => {
		if (form.content !== '') {
			onCommentSubmit(form);
			form.content = '';
		} else {
			window.alert('댓글 내용을 작성해주세요.');
		}
		form.content = '';
	};
	return (
		<CommentEditorBlock id="comment-editor">
			<CommentInput
				placeholder="댓글을 작성하세요"
				onChange={onCommentChange}
				value={form.content}
			/>
			<CommentSubmitBtn onClick={onCommentSubmitBtnClick}>작성</CommentSubmitBtn>
		</CommentEditorBlock>
	);
};

export default CommentEditor;
