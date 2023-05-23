# microservice

#Description:

I built an application with express js and rabbitmq, one of them is the producer that publishes data and the second one the consumer thae receives the data.

#Application steps:

. initialize node js app
. add some dependencies express nodemon amqplib
    express to create my server
    nodemon to refresh auto when changes made
    amqplib to establish connection with rabbitmq 
. Create the express server
. Create the connection with rabbitmq
. Create channel
. Declare some constants : queue_name, exchange_name, key_name
. Create exchange
. Create queue
. Bind the queue
. Publish the data
