FROM node:14

WORKDIR /micro-service-producer1

RUN npm install

COPY . .

EXPOSE 8001

CMD [ "node", "app.js" ]