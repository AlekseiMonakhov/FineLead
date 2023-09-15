FROM postgres:latest

ENV POSTGRES_USER=${POSTGRES_USER}
ENV POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
ENV POSTGRES_DB=${POSTGRES_DB}

COPY create_tables.sql /docker-entrypoint-initdb.d/

CMD ["postgres", "-c", "listen_addresses=*", "-c", "max_connections=300"]
