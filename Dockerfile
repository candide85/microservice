FROM node:19.5.0-alpine

WORKDIR /micro-service-producer1

RUN npm install express

COPY . .

EXPOSE 8001

CMD [ "node", "app.js" ]