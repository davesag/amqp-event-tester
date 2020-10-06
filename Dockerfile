FROM node:12-slim
LABEL maintainer="davesag@gmail.com"

RUN mkdir /app && chown -R node:node /app
WORKDIR /app

COPY --chown=node:node package.json package-lock.json index.js start.sh ./
COPY --chown=node:node src/ ./src/

ENV NODE_PATH .
ENV NODE_ENV production
ENV HUSKY_SKIP_INSTALL true

USER node

RUN npm install --production

ENTRYPOINT ["start.sh" ]
