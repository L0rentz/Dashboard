FROM node:16.11.1

RUN mkdir -p /app

WORKDIR /app

COPY package*.json /app/

COPY yarn.lock /app

RUN yarn install

COPY . /app

EXPOSE 3000