DO $$
DECLARE
  v_user TEXT := 'test-user';
  v_password TEXT := 'test-password';
  v_schema_users TEXT := 'users';
  v_schema_traffic TEXT := 'traffic';
  v_database TEXT := 'lead_fin';
BEGIN
  PERFORM datname FROM pg_database WHERE datname = v_database;
  IF NOT FOUND THEN
    EXECUTE format('CREATE DATABASE %I', v_database);
  END IF;
  
  EXECUTE format('GRANT CONNECT ON DATABASE %I TO %I', v_database, v_user);
  
  EXECUTE format('CREATE ROLE %I LOGIN PASSWORD %L', v_user, v_password);
  EXECUTE format('GRANT %I TO %I', v_user, v_user);  
  EXECUTE format('CREATE SCHEMA IF NOT EXISTS %I', v_schema_users);
  EXECUTE format('CREATE SCHEMA IF NOT EXISTS %I', v_schema_traffic);
  
  EXECUTE format('GRANT USAGE ON SCHEMA %I TO %I', v_schema_users, v_user);
  EXECUTE format('ALTER DEFAULT PRIVILEGES FOR ROLE %I IN SCHEMA %I GRANT CREATE ON TABLES', v_user, v_schema_users);
  
  EXECUTE format('GRANT USAGE ON SCHEMA %I TO %I', v_schema_traffic, v_user);
  EXECUTE format('ALTER DEFAULT PRIVILEGES FOR ROLE %I IN SCHEMA %I GRANT CREATE ON TABLES', v_user, v_schema_traffic);
  
  EXECUTE format('CREATE TABLE IF NOT EXISTS %I.users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50),
    hash_password VARCHAR(255),
    email VARCHAR(255),
    created_at DATE,
    updated_at DATE,
    verified BOOL,
    role ENUM(''client'', ''traffic_provider'', ''admin'')
  )', v_schema_users);
  
  EXECUTE format('CREATE TABLE IF NOT EXISTS %I.clients (
    client_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES %I.users(user_id)
  )', v_schema_users, v_schema_users);
  
  EXECUTE format('CREATE TABLE IF NOT EXISTS %I.traffic_providers (
    provider_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES %I.users(user_id)
  )', v_schema_users, v_schema_users);
  
  EXECUTE format('CREATE TABLE IF NOT EXISTS %I.offers (
    offer_id SERIAL PRIMARY KEY,
    client_id INT REFERENCES %I.clients(client_id),
    url VARCHAR(255),
    click_cost DECIMAL(10, 2)
  )', v_schema_traffic, v_schema_users);
  
  EXECUTE format('CREATE TABLE IF NOT EXISTS %I.traffic_provider_offers (
    traffic_provider_offer_id SERIAL PRIMARY KEY,
    traffic_provider_id INT REFERENCES %I.traffic_providers(provider_id),
    offer_id INT REFERENCES %I.offers(offer_id),
    proxy_link VARCHAR(255)
  )', v_schema_traffic, v_schema_users, v_schema_traffic);
  
  EXECUTE format('CREATE TABLE IF NOT EXISTS %I.clicks (
    click_id SERIAL PRIMARY KEY,
    offer_id INT REFERENCES %I.offers(offer_id),
    traffic_provider_offer_id INT REFERENCES %I.traffic_provider_offers(traffic_provider_offer_id),
    click_datetime TIMESTAMP,
    ip_address VARCHAR(45)
  )', v_schema_traffic, v_schema_traffic, v_schema_users);
  
END $$;
