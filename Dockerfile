FROM node:16.11.1

RUN mkdir -p /app

WORKDIR /app

COPY package*.json /app/

COPY package-lock.json /app

RUN npm install

COPY . /app

EXPOSE 3000