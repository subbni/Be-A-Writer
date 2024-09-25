import pool from '../psql.js';

/**
 * article_id, title, subtitle, content, author_id, created_at, updated_at
 */

class ArticleRepository {
	static async create({ title, subtitle, content, authorId }) {
		const result = await pool.query(
			'INSERT INTO article (title, subtitle, content, author_id) VALUES ($1, $2, $3, $4) RETURNING *',
			[title, subtitle, content, authorId],
		);
		return result.rows[0];
	}

	static async findByArticleId(articleId) {
		const result = await pool.query(
			'SELECT * FROM article WHERE article_id = $1',
			[articleId],
		);
		return result.rows[0];
	}

	static async findByAuthorId(authorId, params) {
		const result = await pool.query(
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
			[authorId, params.limit, params.offset],
		);

		return {
			data: result.rows,
			count: result.rows.length > 0 ? result.rows[0].total_count : 0,
		};
	}

	static async findByAuthorIdAndCreatedAt(
		authorId,
		{ year, month, day = null },
	) {
		const sql = `SELECT *
			FROM article
			WHERE author_id = $1
			AND EXTRACT(YEAR FROM created_at) = $2
			AND EXTRACT(MONTH FROM created_at) = $3
			${day ? 'AND EXTRACT(DAY FROM created_at) = $4' : ''}
			ORDER BY article_id `;

		const params = day ? [authorId, year, month, day] : [authorId, year, month];
		const result = await pool.query(sql, params);
		return {
			data: result.rows,
			count: result.rows.length,
		};
	}

	static async update({ articleId, title, subtitle, content }) {
		const result = await pool.query(
			`UPDATE article 
			SET title = $1, subtitle = $2, content = $3, updated_at = NOW() 
			WHERE article_id = $4
			RETURNING *`,
			[title, subtitle, content, articleId],
		);
		return result.rows[0];
	}

	static async delete(articleId) {
		const result = await pool.query(
			`DELETE FROM article
			WHERE article_id = $1
			RETURNING *`,
			[articleId],
		);
		return result.rows[0];
	}

	static async findAll(params) {
		const result = await pool.query(
			`WITH article_count AS (
					SELECT COUNT(*) as total_count 
					FROM article 
			)
			SELECT a.*, m.nickname AS author_nickname, (SELECT total_count FROM article_count) 
			FROM article a
			JOIN member m ON a.author_id = m.member_id
			ORDER BY a.article_id DESC 
			LIMIT $1 OFFSET $2`,
			[params.limit, params.offset],
		);
		return {
			data: result.rows,
			count: result.rows.length > 0 ? result.rows[0].total_count : 0,
		};
	}

	static async getToTalCount() {
		const result = await pool.query('SELECT count(*) FROM article');
		return result.rows[0].count;
	}
}

export default ArticleRepository;
