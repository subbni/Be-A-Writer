import { Router } from 'express';
import MemberController from '../controllers/memberController.js';
import checkLoggedIn from '../lib/checkLoggedIn.js';
import upload from '../config/multerConfig.js';

const memberRouter = Router();

const uploadToProfile = upload('profiles');

memberRouter.get('/:memberId', MemberController.getMemberProfile);
memberRouter.patch(
	'/profile',
	checkLoggedIn,
	MemberController.updateMemberProfile,
);
memberRouter.post(
	'/profile/image',
	checkLoggedIn,
	uploadToProfile.single('file'),
	MemberController.updateMemberProfileImage,
);

export default memberRouter;
