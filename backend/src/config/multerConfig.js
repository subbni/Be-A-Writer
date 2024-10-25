import multer from 'multer';
import multerS3 from 'multer-s3';
import path from 'path';
import s3 from './s3Client.js';

const upload = (directory = 'profiles') =>
	multer({
		storage: multerS3({
			s3: s3(),
			bucket: process.env.AWS_S3_BUCKET_NAME,
			key: (req, file, cb) => {
				const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
				cb(
					null,
					`${directory}/${uniqueSuffix}${path.extname(file.originalname)}`,
				);
				// S3에 저장될 파일 경로와 이름
			},
			contentType: multerS3.AUTO_CONTENT_TYPE,
		}),
	});

export default upload;
