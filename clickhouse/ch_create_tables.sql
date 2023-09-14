CREATE DATABASE IF NOT EXISTS traffic;

CREATE TABLE IF NOT EXISTS traffic.clicks
(
    click_id Int32,
    traffic_provider_id Int32,
    offer_id Int32,
    click_datetime DateTime,
    ip_address String
)
ENGINE = MergeTree()
ORDER BY (click_datetime);
