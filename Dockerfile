# base image
FROM node:12.16.0 AS builder
WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install
COPY . .
RUN yarn run build

RUN yarn global add serve
CMD [ "yarn", "run-server" ]

