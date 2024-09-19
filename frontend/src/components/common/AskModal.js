import styled, { css } from 'styled-components';

const FullScreen = styled.div`
	position: fixed;
	z-index: 200;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.25);
	display: flex;
	justify-content: center;
	align-items: center;
`;

const AskModalBlock = styled.div`
	width: 400px;
	background: white;
	padding: 1.5rem;
	border-radius: 4px;
	box-shadow: 0 0 8px rgba(0, 0, 0, 0.125);
`;

const ButtonWrapper = styled.div`
	display: flex;
	justify-content: end;
`;

const modalButtonStyle = css`
	width: 20%;
	border: none;
	background-color: var(--color-light-gray);
	color: var(--color-dark-gray);
	padding: 0.5rem;
	margin: 0 0.5rem;
	margin-top: 1rem;
	font-size: 1rem;
	border-radius: 4px;
	cursor: pointer;
	&:hover {
		background-color: var(--color-dark-gray);
		color: white;
	}
`;

const StyledButton = styled.button`
	${modalButtonStyle}
`;

const AskModal = ({
	visible,
	title,
	description,
	confirmText = '확인',
	cancelText = '취소',
	onConfirm,
	onCancel,
}) => {
	if (!visible) return null;
	return (
		<FullScreen>
			<AskModalBlock>
				<h3>{title}</h3>
				<p>{description}</p>
				<div className="buttons"></div>
				<ButtonWrapper>
					<StyledButton onClick={onCancel}>{cancelText}</StyledButton>
					<StyledButton onClick={onConfirm}>{confirmText}</StyledButton>
				</ButtonWrapper>
			</AskModalBlock>
		</FullScreen>
	);
};

export default AskModal;
