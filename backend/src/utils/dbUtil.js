import pool from '../config/db.js';

async function transaction(callback) {
	const client = await pool.connect();
	try {
		await client.query('BEGIN');
		const result = await callback(client);
		await client.query('COMMIT');
		return result;
	} catch (error) {
		await client.query('ROLLBACK');
		console.error(error);
	} finally {
		client.release();
	}
}

export { transaction };
