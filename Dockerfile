FROM node:10-alpine
MAINTAINER david.sag@industrie.co

WORKDIR /InformationDisorderProject/services/facebook-source-manager

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install

COPY src src
COPY tasks tasks
# COPY seed-data seed-data
COPY config config
COPY index.js index.js
COPY api.yml api.yml
COPY .sequelizerc .sequelizerc
# COPY .env .env

EXPOSE 3000
ENTRYPOINT ["npm" , "start" ]
