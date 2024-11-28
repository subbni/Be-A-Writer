export default class Image {
	constructor({ imageId, storedName, storedUrl, usageType }) {
		this.imageId = imageId;
		this.storedName = storedName;
		this.storedUrl = storedUrl;
		this.usageType = usageType;
	}

	// DB에서 받아온 데이터를 카멜케이스로 변환
	static fromDb(dbData) {
		return new Image({
			imageId: dbData.image_id,
			storedName: dbData.stored_name,
			storedUrl: dbData.stored_url,
			usageType: dbData.usage_type,
		});
	}
}
