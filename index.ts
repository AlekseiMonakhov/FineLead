import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import urlRoutes from './infrastructure/routes/urlRoute';
import pool from './infrastructure/db/config/dbConfig';

dotenv.config();

const app: Express = express();
const corsOptions = {
  origin: true,
  credentials: true,
};
app.use(cors(corsOptions));
app.use('/api/v1', urlRoutes);
const port = process.env.SERVER_PORT;
const host = process.env.SERVER_HOST;

app.listen(port, async () => {
  console.log(`⚡️[server]: Server is running at http://${host}:${port}`);
  try {
    const client = await pool.connect();
    client.release();
    console.log('Соединение с базой данных установлено.');
  } catch (error) {
    console.error('Ошибка при установлении соединения с базой данных:', error);
  }
});
