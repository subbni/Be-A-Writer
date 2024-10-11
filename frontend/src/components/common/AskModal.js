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
	color: var(--color-dark-gray);
	padding: 0.5rem;
	margin: 0 0.5rem;
	margin-top: 1rem;
	font-size: 1rem;
	font-weight: 500;
	border-radius: 4px;
	cursor: pointer;
	${({ $cancel }) =>
		$cancel &&
		css`
			color: var(--color-point);
			background: none;
			&:hover {
				background: var(--color-light-gray);
			}
		`}

	${({ $confirm }) =>
		$confirm &&
		css`
			color: white;
			background: #52607f;
			&:hover {
				background: var(--color-point);
			}
		`}
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
					<StyledButton $cancel={true} onClick={onCancel}>
						{cancelText}
					</StyledButton>
					<StyledButton $confirm={true} onClick={onConfirm}>
						{confirmText}
					</StyledButton>
				</ButtonWrapper>
			</AskModalBlock>
		</FullScreen>
	);
};

export default AskModal;
