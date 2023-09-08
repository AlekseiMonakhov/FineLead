CREATE DATABASE IF NOT EXISTS lead_fin;

CREATE USER test_user WITH PASSWORD 'test_password';

ALTER USER test_user SET ROLE TO test_role;
