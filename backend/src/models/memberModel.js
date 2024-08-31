import pool from '../psql.js';

class MemberModel {
	static async createMember({ email, password, nickname }) {
		const result = await pool.query(
			'INSERT INTO member (email, password, nickname) VALUES ($1, $2, $3) RETURNING *',
			[email, password, nickname],
		);
		return result.rows[0];
	}

	static async findMemberByEmail(email) {
		const query = 'SELECT * FROM member WHERE email = $1';
		const result = await pool.query(query, [email]);
		return result.rows.length === 0 ? null : result.rows[0];
	}
}

export default MemberModel;
