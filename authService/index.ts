import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import pool from './infrastructure/db/config/postgresConfig';
import cookieParser from 'cookie-parser';
import authRouter from './infrastructure/routes/authRoute';

dotenv.config();

const app: Express = express();
const corsOptions = {
  origin: true,
  credentials: true,
};
app.use(cookieParser())
app.use(cors(corsOptions));
app.use(express.json());
app.use('/auth/v1', authRouter);
const port = process.env.SERVER_PORT;
const host = process.env.SERVER_HOST;

app.listen(port, async () => {
  console.log(`⚡️[auth-service]: Server is running at http://${host}:${port}`);
  try {
    const client = await pool.connect();
    client.release();
    console.log('The database connection has been established.');
  } catch (error) {
    console.error('Error establishing a database connection:', error);
  }
});
