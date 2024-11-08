import pool from '../config/db.js';

/**
 * (NOT NULL) article_id, member_id, content, recomment_count
 * (NULLABLE) parent_id, mention_member_id
 * created_at, updated_at
 */
class CommentRepository {
	static async create(
		{ article_id, content, parent_id, mention_member_id },
		member_id,
	) {
		const result = await pool.query(
			'INSERT INTO comment (article_id, member_id, content, parent_id, mention_member_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
			[article_id, member_id, content, parent_id, mention_member_id],
		);
		return result.rows[0];
	}

	static async getCountByArticleId(article_id) {
		const result = await pool.query(
			'SELECT count(*) FROM comment WHERE article_id = $1 AND deleted = false',
			[article_id],
		);
		return result.rows[0];
	}

	static async getParentCommentCountByArticleId(article_id) {
		const result = await pool.query(
			'SELECT count(*) FROM comment WHERE article_id = $1 AND deleted = false AND parent_id IS NULL',
			[article_id],
		);
		return result.rows[0];
	}

	static async findParentCommentByArticleId(article_id, { limit, offset }) {
		const result = await pool.query(
			`SELECT c.*, m.nickname AS member_nickname, m.member_id AS member_id, i.stored_url AS member_profile_url
			FROM comment c
			JOIN member m ON c.member_id = m.member_id
			LEFT JOIN image i ON m.profile_image_id = i.image_id
			WHERE c.article_id = $1
				AND c.parent_id IS NULL
			ORDER BY c.created_at ASC
			LIMIT $2 OFFSET $3;
			`,
			[article_id, limit, offset],
		);

		return result.rows;
	}

	static async findReplyCommentByParentId(parent_id) {
		const result = await pool.query(
			`SELECT c.*, m.nickname AS member_nickname, m.member_id AS member_id, i.stored_url AS member_profile_url
			FROM comment c
			JOIN member m ON c.member_id = m.member_id
			LEFT JOIN image i ON m.profile_image_id = i.image_id
			WHERE c.parent_id = $1
			ORDER BY c.created_at ASC;
			`,
			[parent_id],
		);
		return result.rows;
	}

	static async findByCommentId(commentId) {
		const result = await pool.query(
			'SELECT * FROM comment WHERE comment_id = $1',
			[commentId],
		);
		return result.rows[0];
	}

	static async updateRecommentCount(comment_id, amount) {
		const result = await pool.query(
			`UPDATE comment c
			SET recomment_count = recomment_count + $1
			WHERE comment_id = $2`,
			[amount, comment_id],
		);

		return result.rows;
	}

	static async update({ commentId, content }) {
		const result = await pool.query(
			`UPDATE comment
			SET content = $1, updated_at = NOW()
			WHERE comment_id = $2
			RETURNING *
			`,
			[content, commentId],
		);
		return result.rows[0];
	}

	static async delete(commentId) {
		const result = await pool.query(
			`DELETE FROM comment
			WHERE comment_id = $1
			RETURNING *`,
			[commentId],
		);
		return result.rows[0];
	}

	static async updateDeleted(commentId) {
		const result = await pool.query(
			`UPDATE comment
			SET deleted = true
			WHERE comment_id = $1
			RETURNING *
			`,
			[commentId],
		);
		return result.rows[0];
	}
}

export default CommentRepository;
