import pool from '../config/db.js';

class MemberRepository {
	static async create({ email, password, nickname, authProvider }) {
		const result = await pool.query(
			'INSERT INTO member (email, password, nickname, auth_provider) VALUES ($1, $2, $3, $4) RETURNING *',
			[email, password, nickname, authProvider],
		);
		return result.rows[0];
	}

	static async findByEmail(email) {
		const query = 'SELECT * FROM member WHERE email = $1';
		const result = await pool.query(query, [email]);
		return result.rows.length === 0 ? null : result.rows[0];
	}

	static async findByMemberId(memberId) {
		const result = await pool.query(
			'SELECT * FROM member WHERE member_id = $1',
			[memberId],
		);
		return result.rows.length === 0 ? null : result.rows[0];
	}

	static async findByNickname(nickname) {
		const result = await pool.query(
			'SELECT * FROM member WHERE nickname = $1',
			[nickname],
		);
		return result.rows[0];
	}

	static async updateProfile({ memberId, nickname, bio }) {
		const result = await pool.query(
			`UPDATE member
			SET nickname = $2, bio = $3
			WHERE member_id = $1
			RETURNING *`,
			[memberId, nickname, bio],
		);
		return result.rows[0];
	}

	static async updateProfileImage({ memberId, imageId }) {
		const result = await pool.query(
			`UPDATE member
			SET profile_image_id = $1
			WHERE member_id = $2
			RETURNING *`,
			[imageId, memberId],
		);
		return result.rows[0];
	}

	static async deleteProfileImage(memberId) {
		const result = await pool.query(
			`UPDATE member
			SET profile_image_id = null
			WHERE member_id = $1
			RETURNING *`,
			[memberId],
		);
		return result.rows[0];
	}

	static async updatePassword(memberId, newPassword) {
		const result = await pool.query(
			`UPDATE member
			SET password = $2
			WHERE member_id = $1
			RETURNING *`,
			[memberId, newPassword],
		);
		return result.rows[0];
	}
}

export default MemberRepository;
