import ImageRepository from '../repositories/imageRepository.js';

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
}

export default ImageService;
