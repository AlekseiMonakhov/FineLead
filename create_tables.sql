CREATE TYPE user_role AS ENUM ('client', 'traffic_provider', 'admin');

CREATE SCHEMA IF NOT EXISTS users;
CREATE SCHEMA IF NOT EXISTS traffic;

CREATE TABLE IF NOT EXISTS users.users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(50),
  hash_password VARCHAR(255),
  email VARCHAR(255),
  created_at DATE,
  updated_at DATE,
  verified BOOL,
  role user_role
);

CREATE TABLE IF NOT EXISTS users.clients (
  client_id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users.users(user_id)
);

CREATE TABLE IF NOT EXISTS users.traffic_providers (
  provider_id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users.users(user_id)
);

CREATE TABLE IF NOT EXISTS traffic.offers (
  offer_id SERIAL PRIMARY KEY,
  client_id INT REFERENCES users.clients(client_id),
  url VARCHAR(255),
  click_cost DECIMAL(10, 2)
);

CREATE TABLE IF NOT EXISTS traffic.traffic_provider_offers (
  traffic_provider_offer_id SERIAL PRIMARY KEY,
  traffic_provider_id INT REFERENCES users.traffic_providers(provider_id),
  offer_id INT REFERENCES traffic.offers(offer_id),
  proxy_link VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS traffic.clicks (
  click_id SERIAL PRIMARY KEY,
  offer_id INT REFERENCES traffic.offers(offer_id),
  traffic_provider_offer_id INT REFERENCES traffic.traffic_provider_offers(traffic_provider_offer_id),
  click_datetime TIMESTAMP,
  ip_address VARCHAR(45)
);

GRANT USAGE ON SCHEMA users TO test_role;
GRANT USAGE ON SCHEMA traffic TO test_role;
