import pool from '../config/db.js';
import Member from '../models/Member.js';

class MemberRepository {
	static async create(
		{ email, password, nickname, authProvider },
		client = null,
	) {
		const queryRunner = client || pool;
		const result = await queryRunner.query(
			'INSERT INTO member (email, password, nickname, auth_provider) VALUES ($1, $2, $3, $4) RETURNING *',
			[email, password, nickname, authProvider],
		);
		if (result.rows.length > 0) {
			return Member.fromDb(result.rows[0]);
		} else {
			return null;
		}
	}

	static async findByEmail(email, client = null) {
		const queryRunner = client || pool;
		const query = 'SELECT * FROM member WHERE email = $1';
		const result = await queryRunner.query(query, [email]);
		if (result.rows.length > 0) {
			return Member.fromDb(result.rows[0]);
		} else {
			return null;
		}
	}

	static async findByMemberId(memberId, client = null) {
		const queryRunner = client || pool;
		const result = await queryRunner.query(
			'SELECT * FROM member WHERE member_id = $1',
			[memberId],
		);
		if (result.rows.length > 0) {
			return Member.fromDb(result.rows[0]);
		} else {
			return null;
		}
	}

	static async findByNickname(nickname, client = null) {
		const queryRunner = client || pool;
		const result = await queryRunner.query(
			'SELECT * FROM member WHERE nickname = $1',
			[nickname],
		);
		if (result.rows.length > 0) {
			return Member.fromDb(result.rows[0]);
		} else {
			return null;
		}
	}

	static async updateProfile({ memberId, nickname, bio }, client = null) {
		const queryRunner = client || pool;
		const result = await queryRunner.query(
			`UPDATE member
			SET nickname = $2, bio = $3
			WHERE member_id = $1
			RETURNING *`,
			[memberId, nickname, bio],
		);
		if (result.rows.length > 0) {
			return Member.fromDb(result.rows[0]);
		} else {
			return null;
		}
	}

	static async updateProfileImage({ memberId, imageId }, client = null) {
		const queryRunner = client || pool;
		const result = await queryRunner.query(
			`UPDATE member
			SET profile_image_id = $1
			WHERE member_id = $2
			RETURNING *`,
			[imageId, memberId],
		);
		if (result.rows.length > 0) {
			return Member.fromDb(result.rows[0]);
		} else {
			return null;
		}
	}

	static async deleteProfileImage(memberId, client = null) {
		const queryRunner = client || pool;
		const result = await queryRunner.query(
			`UPDATE member
			SET profile_image_id = null
			WHERE member_id = $1
			RETURNING *`,
			[memberId],
		);
		if (result.rows.length > 0) {
			return Member.fromDb(result.rows[0]);
		} else {
			return null;
		}
	}

	static async updatePassword({ memberId, newPassword }, client = null) {
		const queryRunner = client || pool;
		const result = await queryRunner.query(
			`UPDATE member
			SET password = $2
			WHERE member_id = $1
			RETURNING *`,
			[memberId, newPassword],
		);
		if (result.rows.length > 0) {
			return Member.fromDb(result.rows[0]);
		} else {
			return null;
		}
	}
}

export default MemberRepository;
