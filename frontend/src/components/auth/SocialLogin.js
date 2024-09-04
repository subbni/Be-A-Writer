import React from 'react';
import styled from 'styled-components';
import google from '../../images/btn_google.svg';
import naver from '../../images/btn_naver.svg';
import kakao from '../../images/btn_kakao.svg';

const SocialLoginBlock = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	width: 100%;
	padding: 1rem 0;
`;

const SocialLogo = styled.img`
	width: 35px;
	margin: 0.5rem 0.75rem;
	cursor: pointer;
	scale: 0.85;

	&:hover {
		scale: 1;
	}
`;

const SocialLogin = () => {
	return (
		<SocialLoginBlock>
			<div>
				<SocialLogo src={google} alt="google login" />
				<SocialLogo src={naver} alt="naver login" />
				<SocialLogo src={kakao} alt="kakao login" />
			</div>
		</SocialLoginBlock>
	);
};

export default SocialLogin;
