FROM node:latest
MAINTAINER davesag@gmail.com

WORKDIR /amqp-event-tester

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install

COPY src src
COPY index.js index.js
COPY start.sh start.sh

ENTRYPOINT ["./start.sh" ]
