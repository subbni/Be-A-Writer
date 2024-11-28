import pool from '../config/db.js';
import Comment from '../models/Comment.js';

/**
 * (NOT NULL) article_id, member_id, content, recomment_count
 * (NULLABLE) parent_id, mention_member_id
 * created_at, updated_at
 */

class CommentRepository {
	static async create(
		{ articleId, content, parentId, mentionMemberId, memberId },
		client = null,
	) {
		const queryRunner = client || pool;
		const result = await queryRunner.query(
			'INSERT INTO comment (article_id, member_id, content, parent_id, mention_member_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
			[articleId, memberId, content, parentId, mentionMemberId],
		);

		if (result.rows.length > 0) {
			return Comment.fromDb(result.rows[0]);
		} else {
			return null;
		}
	}

	static async getCountByArticleId(articleId, client = null) {
		const queryRunner = client || pool;
		const result = await queryRunner.query(
			'SELECT count(*) FROM comment WHERE article_id = $1 AND deleted = false',
			[articleId],
		);
		return result.rows[0];
	}

	static async getParentCommentCountByArticleId(articleId, client = null) {
		const queryRunner = client || pool;
		const result = await queryRunner.query(
			'SELECT count(*) FROM comment WHERE article_id = $1 AND deleted = false AND parent_id IS NULL',
			[articleId],
		);
		return result.rows[0];
	}

	static async findParentCommentByArticleId(
		{ articleId, limit, offset },
		client = null,
	) {
		const queryRunner = client || pool;
		const result = await queryRunner.query(
			`SELECT c.*, m.nickname AS member_nickname, m.member_id AS member_id, i.stored_url AS member_profile_url
			FROM comment c
			JOIN member m ON c.member_id = m.member_id
			LEFT JOIN image i ON m.profile_image_id = i.image_id
			WHERE c.article_id = $1
				AND c.parent_id IS NULL
			ORDER BY c.created_at ASC
			LIMIT $2 OFFSET $3;
			`,
			[articleId, limit, offset],
		);
		return result.rows.map((row) => {
			const comment = Comment.fromDb(row);
			comment.memberNickname = row.member_nickname;
			comment.memberId = row.member_id;
			comment.memberProfileUrl = row.member_profile_url;
			return comment;
		});
	}

	static async findReplyCommentByParentId(parentId, client = null) {
		const queryRunner = client || pool;
		const result = await queryRunner.query(
			`SELECT c.*, m.nickname AS member_nickname, m.member_id AS member_id, i.stored_url AS member_profile_url
			FROM comment c
			JOIN member m ON c.member_id = m.member_id
			LEFT JOIN image i ON m.profile_image_id = i.image_id
			WHERE c.parent_id = $1
			ORDER BY c.created_at ASC;
			`,
			[parentId],
		);
		return result.rows.map((row) => {
			const comment = Comment.fromDb(row);
			comment.memberNickname = row.member_nickname;
			comment.memberId = row.member_id;
			comment.memberProfileUrl = row.member_profile_url;
			return comment;
		});
	}

	static async findByCommentId(commentId, client = null) {
		const queryRunner = client || pool;
		const result = await queryRunner.query(
			'SELECT * FROM comment WHERE comment_id = $1',
			[commentId],
		);
		if (result.rows.length > 0) {
			return Comment.fromDb(result.rows[0]);
		} else {
			return null;
		}
	}

	static async updateRecommentCount({ commentId, amount }, client = null) {
		const queryRunner = client || pool;
		const result = await queryRunner.query(
			`UPDATE comment
			SET recomment_count = recomment_count + $1
			WHERE comment_id = $2`,
			[amount, commentId],
		);
		return result.rows;
	}

	static async update({ commentId, content }, client = null) {
		const queryRunner = client || pool;
		const result = await queryRunner.query(
			`UPDATE comment
			SET content = $1, updated_at = NOW()
			WHERE comment_id = $2
			RETURNING *`,
			[content, commentId],
		);
		if (result.rows.length > 0) {
			return Comment.fromDb(result.rows[0]);
		} else {
			return null;
		}
	}

	static async delete(commentId, client = null) {
		const queryRunner = client || pool;
		const result = await queryRunner.query(
			`DELETE FROM comment
			WHERE comment_id = $1
			RETURNING *`,
			[commentId],
		);
		if (result.rows.length > 0) {
			return Comment.fromDb(result.rows[0]);
		} else {
			return null;
		}
	}

	static async deleteByArticleId(articleId, client = null) {
		const queryRunner = client || pool;
		const result = await queryRunner.query(
			`DELETE FROM comment
			WHERE article_id = $1
			RETURNING *`,
			[articleId],
		);
		if (result.rows.length > 0) {
			return Comment.fromDb(result.rows[0]);
		} else {
			return null;
		}
	}

	static async updateDeleted(commentId, client = null) {
		const queryRunner = client || pool;
		const result = await queryRunner.query(
			`UPDATE comment
			SET deleted = true
			WHERE comment_id = $1
			RETURNING *`,
			[commentId],
		);
		if (result.rows.length > 0) {
			return Comment.fromDb(result.rows[0]);
		} else {
			return null;
		}
	}
}

export default CommentRepository;
