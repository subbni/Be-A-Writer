import express from 'express';
import connectPostgreSQL from './psql.js';
const app = new express();

connectPostgreSQL();

app.set('port', process.env.PORT || 4000);

app.get('/', (req, res) => {
	res.send('Hello, Express');
});

app.listen(app.get('port'), () => {
	console.log(`Listening to ${app.get('port')} port ...`);
});
