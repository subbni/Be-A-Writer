import pkg from 'pg';
const { Client } = pkg;

const client = new Client({
	user: 'beawriter',
	host: 'localhost',
	database: 'beawriter',
	password: 'beawriter',
	post: 5432,
});

export default function connectPostgreSQL() {
	client
		.connect()
		.then(() => console.log('Connected to PostgreSQL'))
		.catch((err) =>
			console.error('Connection error to PostgreSQL ', err.stack),
		);
}
