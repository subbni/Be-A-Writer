import pool from '../psql.js';

class ArticleRepository {
	static async createArticle({ title, subtitle, content, author_id }) {
		const result = await pool.query(
			'INSERT INTO article (title, subtitle, content, author_id) VALUES ($1, $2, $3, $4) RETURNING *',
			[title, subtitle, content, author_id],
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
}

export default ArticleRepository;
