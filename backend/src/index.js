import express from 'express';
import pool from './psql.js';
import authRouter from './routes/authRouter.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import jwtMiddleware from './lib/jwtMiddleware.js';

dotenv.config();
const app = new express();

app.set('port', process.env.PORT || 4000);
app.use(express.json());
app.use(cookieParser());

// 라우터 등록
app.use(jwtMiddleware);
app.use('/api/auth', authRouter);

app.listen(app.get('port'), () => {
	console.log(`Listening to ${app.get('port')} port ...`);
});

// 서버 종료 시 Pool 종료
process.on('SIGINT', async () => {
	await pool.end();
	console.log('\nPool had ended.');
	process.exit();
});
