import clickhouse from "../db/clickhouse/config/clickhouseConfig";
import pool from "../db/postgres/config/postgresConfig";

export async function extractAndLoadData() {
    try {
      const client = await pool.connect();
      const pgData = await client.query('SELECT * FROM traffic.clicks');
      const data = pgData.rows;
      client.release();
  
      const jsonEachRowData = data.map(row => ({
        click_id: row.click_id,
        traffic_provider_id: row.traffic_provider_id,
        offer_id: row.offer_id,
        click_datetime: row.click_datetime,
        ip_address: row.ip_address,
      }));
  
      await clickhouse.query('INSERT INTO traffic.clicks (click_id, traffic_provider_id, offer_id, click_datetime, ip_address) FORMAT JSONEachRow', jsonEachRowData);
  
      console.log('Data extracted from the current database and loaded to ClickHouse successfully.');
    } catch (error) {
      console.error('Error:', error);
    }
}