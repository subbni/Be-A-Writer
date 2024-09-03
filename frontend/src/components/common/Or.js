import styled from 'styled-components';

const OrBox = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	width: 100%;

	& > span {
		width: 10%;
	}
`;

const Bar = styled.div`
	width: 45%;
	border-bottom: 1px solid var(--color-dark-gray);
`;

const Or = () => {
	return (
		<OrBox>
			<Bar />
			<span>or</span>
			<Bar />
		</OrBox>
	);
};

export default Or;
