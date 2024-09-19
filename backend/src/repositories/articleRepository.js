import pool from '../psql.js';

/**
 * article_id, title, subtitle, content, author_id, created_at, updated_at
 */

class ArticleRepository {
	static async create({ title, subtitle, content, authorId }) {
		console.log(arguments);
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

	static async findByAuthorId(authorId) {
		const result = await pool.query(
			'SELECT * FROM article WHERE author_id = $1',
			[authorId],
		);
		return result.rows;
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
}

export default ArticleRepository;
