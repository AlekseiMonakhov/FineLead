import dotenv from 'dotenv';
import { ClickHouse } from 'clickhouse';

dotenv.config();    

const clickhouse = new ClickHouse({
  host: process.env.CLICKHOUSE_HOST, 
  port: process.env.CLICKHOUSE_PORT,
  username: process.env.CLICKHOUSE_USER,
  password: process.env.CLICKHOUSE_PASSWORD,
  queryOptions: {
    database: process.env.CLICKHOUSE_DB,
  }
});

export default clickhouse;