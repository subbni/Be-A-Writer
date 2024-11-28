import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
	user: process.env.DB_USER_NAME,
	host: process.env.DB_HOST,
	database: process.env.DB_DATABASE_NAME,
	password: process.env.DB_PASSWORD,
	port: process.env.DB_PORT,
});

export default pool;
