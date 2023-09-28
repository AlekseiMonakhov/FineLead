FROM node:16 AS build

WORKDIR /usr/src/leadfin_frontend

COPY package*.json yarn.lock ./

RUN yarn install

COPY . .

CMD ["yarn", "start"]
