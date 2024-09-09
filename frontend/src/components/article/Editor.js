import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled, { css } from 'styled-components';
import Responsive from '../common/Responsive';

const EiditorBlock = styled(Responsive)`
	padding: 10rem;
	padding-bottom: 5rem;
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
		border: none;
		border-bottom: 1px solid var(--color-gray);
		padding: 0;
		min-height: 320px;
		font-size: 1rem;
		line-height: 1.5;
	}
	.ql-toolbar {
		border-left: none;
		border-right: none;
	}
	.ql-blank {
		width: 100%;
		min-height: 320px;
		&::placeholder {
			color: var(--color-light-gray);
			text-decoration: none;
		}
	}
`;

const Editor = ({ title, subtitle, content, onChangeField, onPublish }) => {
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

	return (
		<EiditorBlock>
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
					<StyledButton onClick={onPublish}>저장</StyledButton>
				</EditorHeader>

				<ReactQuill modules={modules} placeholder="내용을 입력하세요" onChange={onChangeContent} />
			</QuillWrapper>
		</EiditorBlock>
	);
};

export default Editor;
