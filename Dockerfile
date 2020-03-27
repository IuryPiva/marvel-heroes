# base image
FROM node:12.16.0 AS builder
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn run build

FROM node:12.16.0
RUN yarn global add serve
WORKDIR /app
COPY --from=builder /app/build .
CMD ["serve", "-p", "\$\{PORT\}\", "-s", "."]doc
