FROM yandex/clickhouse-server

ENV CLICKHOUSE_USER=${CLICKHOUSE_USER}
ENV CLICKHOUSE_PASSWORD=${CLICKHOUSE_PASSWORD}

COPY ch_create_tables.sql /docker-entrypoint-initdb.d/
