import clickhouse from "../db/clickhouse/config/clickhouseConfig";
import pool from "../db/postgres/config/postgresConfig";


export async function extractAndLoadData() {
    try {
      const client = await pool.connect();
  
      const lastSyncData = await client.query('SELECT last_synced_datetime FROM synced_clicks');
      const lastSyncTime = lastSyncData.rows[0]?.last_synced_datetime || '1970-01-01T00:00:00Z';
  
      const pgData = await client.query('SELECT * FROM traffic.clicks WHERE click_datetime > $1', [lastSyncTime]);
      const data = pgData.rows;
      client.release();
  
      if (data.length === 0) {
        console.log('No new clicks to synchronize.');
        return;
      }
  
      const jsonEachRowData = data.map(row => ({
        click_id: row.click_id,
        traffic_provider_id: row.traffic_provider_id,
        offer_id: row.offer_id,
        click_datetime: row.click_datetime,
        ip_address: row.ip_address,
      }));
  
      await clickhouse.query('INSERT INTO traffic.clicks (click_id, traffic_provider_id, offer_id, click_datetime, ip_address) FORMAT JSONEachRow', jsonEachRowData);
  
      const maxSyncedTime = Math.max(...data.map(row => new Date(row.click_datetime).getTime()));
  
      await client.query('UPDATE synced_clicks SET last_synced_datetime = $1', [new Date(maxSyncedTime).toISOString()]);
  
      console.log('Data extracted from the current database and loaded to ClickHouse successfully.');
    } catch (error) {
      console.error('Error:', error);
    }
  }
  