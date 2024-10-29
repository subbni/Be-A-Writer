import s3 from '../config/s3Client.js';
import ImageRepository from '../repositories/imageRepository.js';
import { deleteS3Image } from '../utils/s3Util.js';

class ImageService {
	static async saveProfileImage(file) {
		const result = await ImageRepository.create({
			storedName: file.key,
			storedUrl: file.location,
		});
		return result;
	}

	static async getImageUrl(imageId) {
		const result = await ImageRepository.findByImageId(imageId);
		return result.stored_url;
	}

	static async deleteImage(imageId) {
		const deletedImage = await ImageRepository.delete(imageId);
		// s3에서 해당 이미지 삭제 처리
		await deleteS3Image({
			Key: deletedImage.stored_name,
		});
	}
}

export default ImageService;
