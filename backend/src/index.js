import express from 'express';
import pool from './psql.js';
const app = new express();

app.set('port', process.env.PORT || 4000);

app.get('/', (req, res) => {
	res.send('Hello, Express');
});

app.listen(app.get('port'), () => {
	console.log(`Listening to ${app.get('port')} port ...`);
});

// 서버 종료 시 Pool 종료
process.on('SIGINT', async () => {
	await pool.end();
	console.log('\nPool had ended.');
	process.exit();
});
