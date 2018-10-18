FROM node:10-alpine
MAINTAINER david.sag@industrie.co

WORKDIR /InformationDisorderProject/services/facebook-source-manager

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install

COPY src src
COPY index.js index.js

EXPOSE 3000
ENTRYPOINT ["npm" , "start" ]
