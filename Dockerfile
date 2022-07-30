FROM node:18-buster
LABEL maintainer="davesag@gmail.com"

RUN mkdir /app && chown -R node:node /app
WORKDIR /app

COPY --chown=node:node package.json package-lock.json index.js start.sh ./
COPY --chown=node:node src/ ./src/

ENV NODE_PATH .
ENV NODE_ENV production
ENV HUSKY 0

USER node

RUN npm install --production

ENTRYPOINT ["start.sh" ]
