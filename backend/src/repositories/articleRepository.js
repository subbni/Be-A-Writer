import pool from '../psql.js';

class ArticleRepository {
	static async createArticle({ title, subtitle, content, author_id }) {
		const result = await pool.query(
			'INSERT INTO article (title, subtitle, content, author_id) VALUES ($1, $2, $3, $4) RETURNING *',
			[title, subtitle, content, author_id],
		);
		return result.rows[0];
	}

	static async findAll() {}
}

export default ArticleRepository;
