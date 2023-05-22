FROM node:14

WORKDIR /micro-service-consumer1

RUN npm install

COPY . .

EXPOSE 5672

CMD [ "node", "index.js" ]