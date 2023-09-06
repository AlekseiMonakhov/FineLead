import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import urlRoutes from './routes/urlRoute';
import { createTables } from './db/createTables';

dotenv.config();

const app: Express = express();
const corsOptions = {
  origin: true,
  credentials: true,
}
app.use(cors(corsOptions));
app.use('/api/v1', urlRoutes);
const port = process.env.PORT;
const host = process.env.HOST;

app.listen(port, async () => {
  console.log(`⚡️[server]: Server is running at http://${host}:${port}`);
  try {
    await createTables();
  } catch (error) {
    console.error('Ошибка при создании таблиц:', error);
  }
});