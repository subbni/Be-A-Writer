import React, { useRef } from 'react';
import styled from 'styled-components';

const FileUploadBtn = styled.div`
	font-size: 12px;
	color: var(--color-dark-gray);
	cursor: pointer;
	padding: 0.5rem;
	border: 1px solid var(--color-gray);
	border-radius: 25px;
`;

const FileUploader = ({ onFileSet, btnStyle, btnText }) => {
	const fileInputRef = useRef(null);
	const handleClick = () => {
		fileInputRef?.current?.click();
	};
	return (
		<>
			<div>
				<input
					ref={fileInputRef}
					className="hidden"
					type="file"
					accept="image/*"
					onChange={onFileSet}
				/>
				<FileUploadBtn onClick={handleClick}>{btnText}</FileUploadBtn>
			</div>
		</>
	);
};

export default FileUploader;
