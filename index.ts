import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import offerRouter from './infrastructure/routes/offerRoute';
import pool from './infrastructure/db/postgres/config/postgresConfig';
import acceptedOfferRouter from './infrastructure/routes/acceptedOfferRoute';
import clickRouter from './infrastructure/routes/clickRoute';
import { extractAndLoadData } from './infrastructure/utils/syncDbToClickhouse';

dotenv.config();

const app: Express = express();
const corsOptions = {
  origin: true,
  credentials: true,
};
const routers = [offerRouter, acceptedOfferRouter, clickRouter];
app.use(cors(corsOptions));
app.use(express.json());
app.use('/api/v1', routers);
const port = process.env.SERVER_PORT;
const host = process.env.SERVER_HOST;

app.listen(port, async () => {
  console.log(`⚡️[server]: Server is running at http://${host}:${port}`);
  try {
    const client = await pool.connect();
    client.release();
    console.log('The database connection has been established.');
    setInterval(extractAndLoadData, 3600000)
  } catch (error) {
    console.error('Error establishing a database connection:', error);
  }
});
