ARG NODE_VERSION=20.12.2

FROM node:$NODE_VERSION-alpine
WORKDIR /app
COPY package.json yarn.lock lerna.json ./
RUN yarn install --frozen-lockfile
RUN yarn lerna bootstrap
COPY . .
