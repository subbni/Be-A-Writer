import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import Or from '../common/Or';
import SocialLogin from './SocialLogin';
import { LOGIN_PAGE, REGISTER_PAGE } from '../../constants/pagePaths';

// TODO : Button 컴포넌트화 하기
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
	&:-webkit-autofill {
		-webkit-box-shadow: 0 0 0 1000px white inset;
		-webkit-text-fill-color: var(--color-black);
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

const ErrorMessage = styled.div`
	color: red;
	text-align: center;
	font-size: 0.8rem;
	margin-top: 1rem;
`;

const textMap = {
	register: '회원가입',
	login: '로그인',
	nicknameRegister: '닉네임 설정',
};

const AuthForm = ({ type, form, onChange, onSubmit, error }) => {
	return (
		<AuthFormBlock>
			<h3>{textMap[type]}</h3>
			<form onSubmit={onSubmit}>
				<StyledInput
					type="email"
					name="email"
					placeholder="이메일"
					onChange={onChange}
					value={form?.email}
					required
					disabled={type === 'nicknameRegister'}
				/>
				{(type === 'register' || type === 'nicknameRegister') && (
					<StyledInput
						type="text"
						name="nickname"
						placeholder="닉네임"
						onChange={onChange}
						value={form?.nickname}
						required
					/>
				)}
				{type !== 'nicknameRegister' && (
					<StyledInput
						type="password"
						name="password"
						placeholder="비밀번호"
						autoComplete="off"
						onChange={onChange}
						value={form?.password}
						required
					/>
				)}

				{type === 'register' && (
					<StyledInput
						type="password"
						name="passwordConfirm"
						placeholder="비밀번호 확인"
						autoComplete="off"
						onChange={onChange}
						value={form?.passwordConfirm}
						required
					/>
				)}
				{error && <ErrorMessage>{error}</ErrorMessage>}
				<StyledButton type="submit">확인</StyledButton>
			</form>
			<AuthFooter>
				{type === 'register' && <Link to={LOGIN_PAGE}>이미 계정이 있으신가요?</Link>}
				{type === 'login' && (
					<>
						<Link to="/">비밀번호 찾기</Link>
						<div>|</div>
						<Link to={REGISTER_PAGE}>회원가입</Link>
					</>
				)}
			</AuthFooter>
			{type !== 'nicknameRegister' && (
				<>
					<Or />
					<SocialLogin />
				</>
			)}
		</AuthFormBlock>
	);
};

export default AuthForm;
