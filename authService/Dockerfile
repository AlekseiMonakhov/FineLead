FROM node:16

RUN apt-get update && apt-get install -y postgresql-client

WORKDIR /usr/src/authService

COPY package*.json yarn.lock ./

RUN yarn install

COPY . .

CMD ["yarn", "dev"]
