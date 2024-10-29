import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import s3 from '../config/s3Client.js';

export const deleteS3Image = async (
	objectParams = {
		Key,
	},
) => {
	try {
		const command = new DeleteObjectCommand({
			Bucket: process.env.AWS_S3_BUCKET_NAME,
			...objectParams,
		});
		const response = await s3.send(command);
		console.log('s3 이미지 삭제 성공');
	} catch (err) {
		console.error('s3 삭제 중 오류 발생', err);
		throw err;
	}
};
