import pool from '../config/db.js';
import Article from '../models/Article.js';

/**
 * article_id, title, subtitle, content, author_id, created_at, updated_at, is_public
 */

class ArticleRepository {
	static async create(
		{ memberId, title, subtitle, content, isPublic },
		client = null,
	) {
		const queryRunner = client || pool;
		const result = await queryRunner.query(
			'INSERT INTO article (title, subtitle, content, is_public, author_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
			[title, subtitle, content, isPublic, memberId],
		);
		if (result.rows.length > 0) {
			return Article.fromDb(result.rows[0]);
		} else {
			return null;
		}
	}

	static async findByArticleId(articleId, client = null) {
		const queryRunner = client || pool;
		const result = await queryRunner.query(
			'SELECT * FROM article WHERE article_id = $1',
			[articleId],
		);
		if (result.rows.length > 0) {
			return Article.fromDb(result.rows[0]);
		} else {
			return null;
		}
	}

	static async findByAuthorId({ memberId, limit, offset }, client = null) {
		const queryRunner = client || pool;
		const result = await queryRunner.query(
			`WITH article_count AS (
					SELECT COUNT(*) as total_count 
					FROM article 
					WHERE author_id = $1
			)
			SELECT *, (SELECT total_count FROM article_count) 
			FROM article 
			WHERE author_id = $1 
			ORDER BY article_id DESC 
			LIMIT $2 OFFSET $3`,
			[memberId, limit, offset],
		);

		return {
			data: result.rows.map((row) => Article.fromDb(row)),
			count: result.rows.length > 0 ? result.rows[0].total_count : 0,
		};
	}

	static async findByAuthorIdAndCreatedAt(
		{ memberId, year, month, day = null },
		client = null,
	) {
		const queryRunner = client || pool;
		const sql = `SELECT *
			FROM article
			WHERE author_id = $1
			AND EXTRACT(YEAR FROM created_at) = $2
			AND EXTRACT(MONTH FROM created_at) = $3
			${day ? 'AND EXTRACT(DAY FROM created_at) = $4' : ''}
			ORDER BY article_id `;

		const params = day ? [memberId, year, month, day] : [memberId, year, month];
		const result = await queryRunner.query(sql, params);
		return {
			data: result.rows.map((row) => Article.fromDb(row)),
			count: result.rows.length,
		};
	}

	static async findByAuthorIdAndIsPublic(
		{ memberId, isPublic, limit, offset },
		client = null,
	) {
		const queryRunner = client || pool;
		const sql = `
    SELECT *
    FROM article
    WHERE author_id = $1 AND is_public = $2
    ORDER BY article_id DESC
    LIMIT $3 OFFSET $4
  `;

		const result = await queryRunner.query(sql, [
			memberId,
			isPublic,
			limit,
			offset,
		]);

		return {
			data: result.rows.map((row) => Article.fromDb(row)),
			count: result.rows.length,
		};
	}

	static async findAll({ limit, offset }, client = null) {
		const queryRunner = client || pool;
		const result = await queryRunner.query(
			`WITH article_count AS (
					SELECT COUNT(*) as total_count 
					FROM article 
					WHERE is_public = TRUE
			)
			SELECT a.*, m.nickname AS author_nickname, (SELECT total_count FROM article_count) 
			FROM article a
			JOIN member m ON a.author_id = m.member_id
			WHERE a.is_public = true
			ORDER BY a.article_id DESC 
			LIMIT $1 OFFSET $2`,
			[limit, offset],
		);
		return {
			data: result.rows.map((row) => {
				const article = Article.fromDb(row);
				article.authorNickname = row.author_nickname;
				return article;
			}),
			count: result.rows.length > 0 ? result.rows[0].total_count : 0,
		};
	}

	static async update(
		{ articleId, title, subtitle, content, isPublic },
		client = null,
	) {
		const queryRunner = client || pool;
		const result = await queryRunner.query(
			`UPDATE article 
			SET title = $1, subtitle = $2, content = $3, is_public = $4, updated_at = NOW() 
			WHERE article_id = $5
			RETURNING *`,
			[title, subtitle, content, isPublic, articleId],
		);
		if (result.rows.length > 0) {
			return Article.fromDb(result.rows[0]);
		} else {
			return null;
		}
	}

	static async updateCommentCount({ articleId, amount }, client = null) {
		const queryRunner = client || pool;
		const result = await queryRunner.query(
			`UPDATE article
			SET comment_count = comment_count + $1
			WHERE article_id = $2
			RETURNING *
			`,
			[amount, articleId],
		);
		if (result.rows.length > 0) {
			return Article.fromDb(result.rows[0]);
		} else {
			return null;
		}
	}

	static async delete(articleId, client = null) {
		const queryRunner = client || pool;
		const result = await queryRunner.query(
			`DELETE FROM article
			WHERE article_id = $1
			RETURNING *`,
			[articleId],
		);
		if (result.rows.length > 0) {
			return Article.fromDb(result.rows[0]);
		} else {
			return null;
		}
	}

	static async getTotalCountByAuthorIdAndIsPublic(
		{ memberId, isPublic },
		client = null,
	) {
		const queryRunner = client || pool;
		const sql = `
    SELECT COUNT(*) AS total_count
    FROM article
    WHERE author_id = $1 AND is_public = $2
  `;

		const countResult = await queryRunner.query(sql, [memberId, isPublic]);
		return countResult.rows[0].total_count;
	}

	static async getToTalCount(client = null) {
		const queryRunner = client || pool;
		const result = await queryRunner.query('SELECT count(*) FROM article');
		return result.rows[0].count;
	}
}

export default ArticleRepository;
