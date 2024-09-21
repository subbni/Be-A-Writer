import styled, { css } from 'styled-components';

const PaginationButtonStyle = css`
	all: unset;
	padding: 5px;
	border: none;
	border-radius: 3px;
	background: none;
	color: var(--color-dark-gray);
	cursor: pointer;
	&:hover {
		border: 1px solid var(--color-light-gray);
	}

	${({ $active }) =>
		$active &&
		css`
			text-decoration: underline;
			color: var(--color-black);
		`};
`;

const PaginationStyledButton = styled.button`
	${PaginationButtonStyle}
`;

const PaginationButton = ({ text, onClick, $active }) => {
	return (
		<PaginationStyledButton onClick={onClick} $active={$active}>
			{text}
		</PaginationStyledButton>
	);
};

export default PaginationButton;
