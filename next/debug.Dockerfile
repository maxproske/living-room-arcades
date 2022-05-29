FROM node:18-alpine

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY src ./src
COPY public ./public
COPY next.config.js .
COPY jsconfig.json .

CMD yarn dev
