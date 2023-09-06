import pool from './dbConfig';

const schemaUsers = 'users';
const schemaTraffic = 'traffic';

const createTablesSQL = `
CREATE SCHEMA IF NOT EXISTS ${schemaUsers};
CREATE SCHEMA IF NOT EXISTS ${schemaTraffic};

CREATE TABLE IF NOT EXISTS ${schemaUsers}.users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(50),
  hash_password VARCHAR(255),
  email VARCHAR(255),
  created_at DATE,
  updated_at DATE,
  verified BOOL,
  role ENUM('client', 'traffic_provider', 'admin')
);

CREATE TABLE IF NOT EXISTS ${schemaUsers}.clients (
  client_id SERIAL PRIMARY KEY,
  user_id INT REFERENCES ${schemaUsers}.users(user_id)
);

CREATE TABLE IF NOT EXISTS ${schemaUsers}.traffic_providers (
  provider_id SERIAL PRIMARY KEY,
  user_id INT REFERENCES ${schemaUsers}.users(user_id)
);

CREATE TABLE IF NOT EXISTS ${schemaTraffic}.offers (
  offer_id SERIAL PRIMARY KEY,
  client_id INT REFERENCES ${schemaUsers}.clients(client_id),
  url VARCHAR(255),
  click_cost DECIMAL(10, 2)
);

CREATE TABLE IF NOT EXISTS ${schemaTraffic}.traffic_provider_offers (
  traffic_provider_offer_id SERIAL PRIMARY KEY,
  traffic_provider_id INT REFERENCES ${schemaUsers}.traffic_providers(provider_id),
  offer_id INT REFERENCES ${schemaTraffic}.offers(offer_id),
  proxy_link VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS ${schemaTraffic}.clicks (
  click_id SERIAL PRIMARY KEY,
  offer_id INT REFERENCES ${schemaTraffic}.offers(offer_id),
  traffic_provider_offer_id INT REFERENCES ${schemaUsers}.traffic_provider_offers(traffic_provider_offer_id),
  click_datetime TIMESTAMP,
  ip_address VARCHAR(45)
);
`;

async function createTables() {
  const client = await pool.connect();
  try {
    await client.query(createTablesSQL);
    console.log('Таблицы успешно созданы.');
  } catch (error) {
    console.error('Ошибка при создании таблиц:', error);
  } finally {
    client.release();
  }
}

export { createTables };
