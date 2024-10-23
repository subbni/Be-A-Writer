import React from 'react';
import Responsive from '../common/Responsive';
import styled from 'styled-components';

const PasswordSettingViewBlock = styled(Responsive)`
	/* border: 1px solid black; */
	padding: 10rem;
	padding-bottom: 5rem;
	max-width: 1000px;
	min-width: 700px;
	.logo-area {
		display: block;
		text-align: center;
		padding-bottom: 4rem;
	}
	.logo {
		font-size: 45px;
		font-family: var(--font-logo);
		letter-spacing: -2.5px;
		color: var(--color-black);
		margin: 10px;
	}
`;

const PasswordSettingForm = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const PasswordSettingItem = styled.div`
	width: 100%;
	label {
		display: block;
		font-size: 0.5rem;
		span {
			color: var(--color-point);
			margin-right: 5px;
		}
	}
`;

const StyledInput = styled.input`
	width: 100%;
	height: 2rem;
	border: none;
	border-bottom: 1px solid var(--color-gray);
	outline: none;
	margin: 0.5rem 0 1rem 0;
	font-size: 1rem;
	&:focus {
		color: var(--color-dark);
		border-bottom: 2px solid var(--color-gray);
	}
	&:-webkit-autofill {
		-webkit-box-shadow: 0 0 0 1000px white inset;
		-webkit-text-fill-color: var(--color-black);
	}
`;

const ErrorMessage = styled.div`
	color: var(--color-point);
	width: 100%;
	text-align: center;
	margin: 1rem 0;
	font-size: 0.8rem;
`;

const BtnWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: end;
	align-items: center;
	margin: 2rem 0;
`;

const StyledBtn = styled.button`
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

const PasswordSettingView = ({ errMsg, form, onChange, onCancel, onSubmit }) => {
	const onFormSubmit = (e) => {
		e.preventDefault();
		onSubmit(form);
	};

	return (
		<PasswordSettingViewBlock>
			<div className="logo-area">
				<div to="/" className="logo">
					Be A Writer
				</div>
				<h3>비밀번호 변경</h3>
			</div>
			<PasswordSettingForm onSubmit={onFormSubmit}>
				<PasswordSettingItem>
					<label htmlFor="currentPassword">
						<span>*</span>현재 비밀번호
					</label>
					<StyledInput
						type="password"
						name="currentPassword"
						value={form?.currentPassword}
						onChange={onChange}
						required
					/>
				</PasswordSettingItem>
				<PasswordSettingItem>
					<label htmlFor="newPassword">
						<span>*</span>새 비밀번호
					</label>
					<StyledInput
						type="password"
						name="newPassword"
						value={form?.newPassword}
						onChange={onChange}
						required
					/>
				</PasswordSettingItem>
				<PasswordSettingItem>
					<label htmlFor="newPasswordConfirm">
						<span>*</span>새 비밀번호 확인
					</label>
					<StyledInput
						type="password"
						name="newPasswordConfirm"
						value={form?.newPasswordConfirm}
						onChange={onChange}
						required
					/>
				</PasswordSettingItem>
				<ErrorMessage>{errMsg}</ErrorMessage>
				<BtnWrapper>
					<StyledBtn type="button" onClick={onCancel}>
						취소
					</StyledBtn>
					<StyledBtn type="submit">저장</StyledBtn>
				</BtnWrapper>
			</PasswordSettingForm>
		</PasswordSettingViewBlock>
	);
};

export default PasswordSettingView;
