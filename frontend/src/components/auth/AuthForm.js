import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import Or from '../common/Or';

const AuthFormBlock = styled.div`
	text-align: center;
	padding: 0 1rem;
	h3 {
		margin: 0;
		margin-bottom: 1.5rem;
	}
`;

const StyledInput = styled.input`
	outline: none;
	border: none;
	border-bottom: 1px solid var(--color-dark-gray);

	width: 100%;
	padding: 10px;
	padding-left: 0;
	margin-bottom: 0.5rem;

	font-size: 1rem;

	&:focus {
		color: var(--color-dark);
		border-bottom: 2px solid var(--color-black);
	}
`;

const authButtonStyle = css`
	width: 100%;
	border: none;
	background-color: var(--color-light-gray);
	color: var(--color-dark-gray);
	padding: 0.5rem;
	margin-top: 1rem;
	font-size: 1rem;
`;

const StyledButton = styled.button`
	${authButtonStyle}
`;

const AuthFooter = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;

	padding: 1rem 0;

	& > * {
		padding: 10px;
		font-size: small;
		color: var(--color-dark-gray);
	}

	& > a {
		&:hover {
			color: var(--color-dark);
		}
	}
`;

const AuthForm = ({ type }) => {
	return (
		<AuthFormBlock>
			<h3>{type}</h3>
			<form>
				<StyledInput placeholder="이메일" />
				<StyledInput placeholder="비밀번호" />
				{type === '회원가입' && <StyledInput placeholder="비밀번호 확인" />}
				<StyledButton>확인</StyledButton>
			</form>
				<AuthFooter>
					{type === '회원가입' ? (
						<Link to="/login">이미 계정이 있으신가요?</Link>
					) : (
						<>
							<Link to="/">비밀번호 찾기</Link>
							<div>|</div>
							<Link to="/register">회원가입</Link>
						</>
					)}
				</AuthFooter>
			<Or />
		</AuthFormBlock>
	);
};

export default AuthForm;
