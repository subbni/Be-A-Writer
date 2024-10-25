import pool from '../config/psql.js';

class ImageRepository {
	static async create({ storedName, storedUrl }) {
		const result = await pool.query(
			'INSERT INTO image (stored_name, stored_url) VALUES ($1, $2) RETURNING *',
			[storedName, storedUrl],
		);
		return result.rows[0];
	}

	static async delete(imageId) {
		const result = await pool.query(
			'DELETE FROM image WHERE image_id = $1 RETURNING *',
			[imageId],
		);
		return result.rows[0];
	}

	static async findByImageId(imageId) {
		const result = await pool.query('SELECT * FROM image WHERE image_id = $1', [
			imageId,
		]);
		return result.rows.length === 0 ? null : result.rows[0];
	}
}

export default ImageRepository;
