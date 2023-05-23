# microservice
microservice
#Description: PRODUCER APPLICATION

I built an application with express js and rabbitmq, one of them is the producer that publishes data and the second one the consumer that receives the data.

#Application steps:

. initialize node js app 
. add amqplib library
    amqplib to establish connection with rabbitmq 
. Create the connection with rabbitmq 
. Create channel 
. Declare some constants : queue_name
. Create queue  
. Consume the data
. Acknowledgement the reception
