import React, { useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled, { css } from 'styled-components';
import Responsive from '../common/Responsive';
import Lock from '../../images/Lock.svg';
import OpenLock from '../../images/OpenLock.svg';

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

const PublishWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	.lock {
		height: 40px;
		padding: 5px;
		scale: 0.9;
		cursor: pointer;
		&:hover {
			scale: 1;
		}
	}
`;
const Tooltip = styled.div`
	position: absolute;
	visibility: hidden;
	left: 3rem;
	top: 10px;
	background-color: white;
	box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
	color: var(--color-dark-gray);
	padding: 5px 10px;
	text-align: center;
	width: 9rem;
	height: 1.5rem;

	font-size: 15px;
	border-radius: 5px;
	bottom: 40%;

	/* 애니메이션 관련 */
	opacity: 0;
	transform: translateY(10px); /* 10px 아래에서 시작 */
	transition: opacity 0.4s ease, transform 0.3s ease;
`;

const LockWrapper = styled.div`
	position: relative;
	&:hover ${Tooltip} {
		visibility: visible;
		opacity: 1;
		transform: translateY(0);
	}
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
	margin: 0.5rem 0;
	/* margin-top: 1rem; */
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

const Editor = ({
	title,
	subtitle,
	content,
	isPublic,
	onChangeField,
	onPublish,
	originalArticle,
}) => {
	const keyDownListener = (event) => {
		if (event.key === 'Enter') {
			const selection = document.getSelection(); // caret 정보 가져오기
			if (selection.rangeCount > 0) {
				// 현재 caret 존재
				const range = selection.getRangeAt(0); // Selection 이 위치한 Node 정보
				const endNode = range.endContainer; // 부모 요소가 아닌 해당 노드 자체를 가져옴
				console.group('keyDownListner 실행');
				// console.log('endNode', endNode);
				// endNode가 텍스트 노드일 경우, 위치 정보를 처리할 수 없음
				if (endNode.nodeType !== Node.TEXT_NODE) {
					// 텍스트 노드가 아닐 경우 바로 위치 정보를 가져올 수 있음
					console.log('텍스트 노드 아님 : ', endNode.textContent);
					const endOffset = endNode.getBoundingClientRect().top; // 세로 위치 정보
					const viewportHeight = window.innerHeight; // 뷰포트 정보
					const limit = (viewportHeight * 4) / 5; // 뷰포트의 4/5 지점

					if (endOffset > limit || endOffset < 0) {
						console.log('다른 노드 : 뷰포트 밖에 있거나 너무 아래에 있음');
						endNode.scrollIntoView({
							behavior: 'smooth',
							block: 'center',
						});
					}
				} else {
				}
				console.groupEnd();
			}
		}
	};

	useEffect(() => {
		const editor = document.querySelector('.ql-editor');
		if (originalArticle) {
			editor.innerHTML = content;
		}
		editor.addEventListener('keydown', keyDownListener);
		return () => {
			if (editor) {
				editor.removeEventListener('keydown', keyDownListener);
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

	const onChangePublicity = (e) => {
		onChangeField({ key: 'isPublic', value: !isPublic });
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
					<PublishWrapper>
						<StyledButton onClick={handlePublish}>저장</StyledButton>
						<LockWrapper>
							{isPublic ? (
								<img className="lock" src={OpenLock} alt="open lock" onClick={onChangePublicity} />
							) : (
								<img className="lock" src={Lock} alt="lock" onClick={onChangePublicity} />
							)}
							<Tooltip>{isPublic ? '공개로 발행됩니다.' : '비공개로 발행됩니다.'}</Tooltip>
						</LockWrapper>
					</PublishWrapper>
				</EditorHeader>

				<ReactQuill modules={modules} placeholder="내용을 입력하세요" onChange={onChangeContent} />
			</QuillWrapper>
		</EditorBlock>
	);
};

export default Editor;
