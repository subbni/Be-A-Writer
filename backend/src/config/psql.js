import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
	user: 'beawriter',
	host: 'localhost',
	database: 'beawriter',
	password: 'beawriter',
	port: 5432,
});

export default pool;
