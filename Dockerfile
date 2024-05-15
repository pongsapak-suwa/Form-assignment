FROM node:18

WORKDIR /usr/src/app

COPY ./package.json ./

RUN npm install

COPY ./routes/ ./routes/
COPY ./middlewares/ ./middlewares/
COPY ./controllers/ ./controllers/
COPY ./models/ ./models/
COPY ./migrations/ ./migrations/
COPY ./config/ ./config/
COPY ./.env ./

COPY ./index.js ./

EXPOSE 8080

CMD ["node", "index.js"]