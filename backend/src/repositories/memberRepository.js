import pool from '../psql.js';

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
}

export default MemberRepository;
