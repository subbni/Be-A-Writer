import { Router } from 'express';
import MemberController from '../controllers/memberController.js';
import checkLoggedIn from '../lib/checkLoggedIn.js';

const memberRouter = Router();

memberRouter.get('/:memberId', MemberController.getMemberProfile);
memberRouter.patch(
	'/profile',
	checkLoggedIn,
	MemberController.updateMemberProfile,
);
export default memberRouter;
