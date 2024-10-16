import AuthTemplate from '../components/auth/AuthTemplate';
import SetNicknameForm from '../containers/auth/SetNicknameForm';

const NicknameSettingPage = () => {
	return (
		<AuthTemplate>
			<SetNicknameForm />
		</AuthTemplate>
	);
};

export default NicknameSettingPage;
