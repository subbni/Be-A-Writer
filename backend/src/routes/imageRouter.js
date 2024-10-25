import { Router } from 'express';
import ImageController from '../controllers/imageController.js';
import upload from '../config/multerConfig.js';
import checkLoggedIn from '../lib/checkLoggedIn.js';

const imageRouter = Router();

const uploadToProfile = upload('profiles');

imageRouter.post(
	'/profile',
	checkLoggedIn,
	uploadToProfile.single('file'),
	ImageController.uploadProfileImage,
);

export default imageRouter;
