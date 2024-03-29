CREATE ROLE test_role WITH LOGIN PASSWORD 'test_password' SUPERUSER;

ALTER ROLE test_user SET ROLE test_role;

CREATE TYPE user_role AS ENUM ('client', 'traffic_provider', 'admin');

CREATE SCHEMA IF NOT EXISTS users;
CREATE SCHEMA IF NOT EXISTS traffic;

GRANT USAGE ON SCHEMA users TO test_role;
GRANT USAGE ON SCHEMA traffic TO test_role;

CREATE TABLE IF NOT EXISTS users.users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(50),
  hash_password VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  created_at DATE,
  updated_at DATE,
  verified BOOL,
  role user_role
);

INSERT INTO users.users (username, hash_password, email, created_at, updated_at, verified, role)
VALUES 
  ('testUser1Client1', 'hash_password', 'testUser1@gmail.com', CURRENT_DATE, CURRENT_DATE, false, 'client'),
  ('testUser2Client2', 'hash_password', 'testUser2@gmail.com', CURRENT_DATE, CURRENT_DATE, false, 'client'),
  ('testUser3Provider1', 'hash_password', 'testUser3@gmail.com', CURRENT_DATE, CURRENT_DATE, false, 'traffic_provider'),
  ('testUser4Provider2', 'hash_password', 'testUser4@gmail.com', CURRENT_DATE, CURRENT_DATE, false, 'traffic_provider');


CREATE TABLE IF NOT EXISTS users.clients (
  client_id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users.users(user_id)
);

CREATE TABLE IF NOT EXISTS users.traffic_providers (
  provider_id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users.users(user_id)
);

CREATE TABLE IF NOT EXISTS users.refresh_tokens (
  id serial PRIMARY KEY,
  token VARCHAR(255) UNIQUE,
  user_id INTEGER REFERENCES users.users(user_id)
);


INSERT INTO users.clients (user_id)
SELECT user_id FROM users.users WHERE username IN ('testUser1Client1', 'testUser2Client2');

INSERT INTO users.traffic_providers (user_id)
SELECT user_id FROM users.users WHERE username IN ('testUser3Provider1', 'testUser4Provider2');

CREATE TABLE IF NOT EXISTS traffic.offers (
  offer_id SERIAL PRIMARY KEY,
  client_id INT REFERENCES users.clients(client_id),
  url VARCHAR(255),
  click_cost DECIMAL(10, 2)
);

CREATE TABLE IF NOT EXISTS traffic.accepted_offers (
  accepted_offer_id SERIAL PRIMARY KEY,
  traffic_provider_id INT REFERENCES users.traffic_providers(provider_id),
  offer_id INT REFERENCES traffic.offers(offer_id),
  proxy_link VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS traffic.clicks (
  click_id SERIAL PRIMARY KEY,
  traffic_provider_id INT REFERENCES users.traffic_providers(provider_id),
  offer_id INT REFERENCES traffic.offers(offer_id),
  click_datetime TIMESTAMP,
  ip_address VARCHAR(45)
);

CREATE TABLE IF NOT EXISTS synced_clicks (
  last_synced_datetime TIMESTAMP
);

