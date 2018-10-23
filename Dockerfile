FROM node:10-alpine
MAINTAINER david.sag@industrie.co

WORKDIR /amqp-event-tester

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install

COPY src src
COPY index.js index.js

ENTRYPOINT ["npm" , "start" ]
