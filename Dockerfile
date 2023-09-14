FROM node:16

RUN apt-get update && apt-get install -y postgresql-client

WORKDIR /usr/src/app

COPY package*.json yarn.lock ./

RUN yarn install --production=false

COPY . .

CMD ["yarn", "dev"]
