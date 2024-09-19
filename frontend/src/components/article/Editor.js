import React, { useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled, { css } from 'styled-components';
import Responsive from '../common/Responsive';
import user from '../../modules/user/user';

const EditorBlock = styled(Responsive)`
	padding: 10rem;
	padding-bottom: 5rem;
	max-width: 1300px;
`;
const EditorHeader = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: start;
	width: 100%;
`;
const TitleWrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 80%;
`;

const TitleInput = styled.input`
	font-size: 2rem;
	outline: none;
	padding-bottom: 0.5rem;
	border: none;
	width: 100%;
	text-indent: 5px;
	&::placeholder {
		color: var(--color-gray);
	}
`;
const SubtitleInput = styled.input`
	font-size: 1.5rem;
	outline: none;
	padding-bottom: 0.5rem;
	border: none;
	margin-bottom: 2rem;
	width: 100%;
	text-indent: 5px;
	&::placeholder {
		color: var(--color-gray);
	}
`;
const writeButtonStyle = css`
	width: 60px;
	height: 40px;
	border: 1px solid var(--color-gray);
	border-radius: 22px;
	background-color: white;
	color: var(--color-dark-gray);
	padding: 0.5rem;
	margin-top: 1rem;
	font-size: 1rem;
	cursor: pointer;
	&:hover {
		background-color: var(--color-light-gray);
	}
`;
const StyledButton = styled.button`
	${writeButtonStyle}
`;
const QuillWrapper = styled.div`
	.ql-container {
		width: 100%;
		border: none;
		/* border-bottom: 1px solid var(--color-gray); */
		padding: 0;
		min-height: 320px;
		font-size: 1rem;
		line-height: 1.5;
	}
	.ql-toolbar {
		border-left: none;
		border-right: none;
	}
	.ql-editor {
		min-height: 320px;
		color: var(--color-black);
		&::placeholder {
			color: var(--color-light-gray);
			text-decoration: none;
		}
	}
`;

const Editor = ({ title, subtitle, content, onChangeField, onPublish, originalArticle }) => {
	const keyDownListenr = (event) => {
		if (event.key === 'Enter') {
			console.log('enter');
			// 사용자가 엔터를 입력했을 경우
			const selection = document.getSelection(); // caret 정보 가져오기
			if (selection.rangeCount > 0) {
				// 현재 caret 존재
				const range = selection.getRangeAt(0); // Selection 이 위치한 Node 정보
				const endNode = range.endContainer.parentElement; // Element
				const endOffset = endNode.getBoundingClientRect().top; // 세로 위치 정보
				const viewportHeight = window.innerHeight; // 뷰포트 정보
				const limit = (viewportHeight * 4) / 5; // 뷰포트의 4/5 지점

				if (endOffset > limit) {
					// 현재 caret 위치가 뷰포트의 5/4지점 보다 더 아래일 경우
					// window.scrollBy({
					// 	// 스크롤 처리
					// 	top: endOffset - limit,
					// 	behavior: 'smooth',
					// });
					window.scrollTo({
						top: document.body.scrollHeight, // 페이지의 전체 높이로 이동
						behavior: 'smooth', // 부드럽게 스크롤
					});
				}
			}
		}
	};

	useEffect(() => {
		const editor = document.querySelector('.ql-editor');
		if (originalArticle) {
			editor.innerHTML = content;
		}
		editor.addEventListener('keydown', keyDownListenr);
		return () => {
			if (editor) {
				editor.removeEventListener('keydown', keyDownListenr);
				editor.innerHTML = '';
			}
		};
	}, []);

	const modules = {
		toolbar: {
			container: [
				['bold', 'italic', 'underline', 'strike'],
				['blockquote', 'code-block', 'link', 'image'],
				[{ header: '1' }, { header: '2' }],
				[{ list: 'ordered' }, { list: 'bullet' }],
			],
		},
	};
	const onChangeTitles = (e) => {
		onChangeField({ key: e.target.name, value: e.target.value });
	};

	const onChangeContent = (e) => {
		onChangeField({ key: 'content', value: e });
	};

	const handlePublish = () => {
		if (checkEmptyFields()) {
			onPublish();
		}
	};

	const checkEmptyFields = () => {
		if (content === '<p><br></p>' || content === '') {
			window.alert('내용을 입력하세요.');
			return false;
		}
		return true;
	};

	return (
		<EditorBlock>
			<QuillWrapper>
				<EditorHeader>
					<TitleWrapper>
						<TitleInput
							name="title"
							value={title}
							placeholder="제목을 입력하세요"
							onChange={onChangeTitles}
						/>
						<SubtitleInput
							name="subtitle"
							value={subtitle}
							placeholder="소제목을 입력하세요"
							onChange={onChangeTitles}
						/>
					</TitleWrapper>
					<StyledButton onClick={handlePublish}>저장</StyledButton>
				</EditorHeader>

				<ReactQuill modules={modules} placeholder="내용을 입력하세요" onChange={onChangeContent} />
			</QuillWrapper>
		</EditorBlock>
	);
};

export default Editor;
