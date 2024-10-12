ARG NODE_VERSION=20.12.2
ARG SERVER_PORT=3001

FROM node:$NODE_VERSION-alpine

WORKDIR /app

COPY package.json yarn.lock lerna.json .nvmrc ./
COPY packages packages
COPY tsconfigs tsconfigs

RUN yarn
RUN yarn global add lerna@6.6.2
RUN lerna clean --yes
RUN yarn