import React from 'react';
import { styled } from 'styled-components';

const AuthTemplateBlock = styled.div`
	position: absolute;
	left: 0;
	top: 0;
	bottom: 0;
	right: 0;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const WhiteBox = styled.div`
	width: 390px;
	.logo-area {
		display: block;
		text-align: center;
		padding-bottom: 2rem;
	}
	.logo {
		font-family: var(--font-logo);
		/* letter-spacing: 2px; */
		color: var(--color-black);
		margin: 10px;
	}
	span {
		color: var(--color-dark-gray);
	}
`;

const AuthTemplate = ({ children }) => {
	return (
		<AuthTemplateBlock>
			<WhiteBox>
				<div className="logo-area">
					<h1 className="logo">Be A Writer</h1>
					<span>누구나 작가가 될 수 있습니다</span>
				</div>
				{children}
			</WhiteBox>
		</AuthTemplateBlock>
	);
};

export default AuthTemplate;
