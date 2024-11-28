import pool from '../config/db.js';
import Image from '../models/Image.js';

class ImageRepository {
	static async create({ storedName, storedUrl }, client = null) {
		const queryRunner = client || pool;
		const result = await queryRunner.query(
			'INSERT INTO image (stored_name, stored_url) VALUES ($1, $2) RETURNING *',
			[storedName, storedUrl],
		);
		if (result.rows.length > 0) {
			return Image.fromDb(result.rows[0]);
		} else {
			return null;
		}
	}

	static async delete(imageId, client = null) {
		const queryRunner = client || pool;
		const result = await queryRunner.query(
			'DELETE FROM image WHERE image_id = $1 RETURNING *',
			[imageId],
		);
		if (result.rows.length > 0) {
			return Image.fromDb(result.rows[0]);
		} else {
			return null;
		}
	}

	static async findByImageId(imageId, client = null) {
		const queryRunner = client || pool;
		const result = await queryRunner.query(
			'SELECT * FROM image WHERE image_id = $1',
			[imageId],
		);
		if (result.rows.length > 0) {
			return Image.fromDb(result.rows[0]);
		} else {
			return null;
		}
	}
}

export default ImageRepository;
