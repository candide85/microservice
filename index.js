// import amqp library to build my microservice application
import amqp from 'amqplib';

// const _url = "amqp://guest:guest@localhost:5672";
// url is use to connect rabbitmq (username, password, port) and the localhost my pc ip address
const amqp_config = {
    username: "joel",
    password: "12345",
    port:"5672",
    hostname: "192.168.1.175", //bringing back later//
};

// declare a function named consumer // better call the function createConsumer or initiateConsumer
function consumer(){
    // connection to rabbitmq that leads to a promise
    amqp.connect(amqp_config, (error)=>{
        if(error){
            throw error;
        }
    // using of .then to retrieve the connection and assign to the connection variable               
    }).then(async (connection)=>{        
        // channel creation is a session application that allows your express app to communicate with rabbitmq
        const channel = await connection.createChannel();
        // declare a constant queue that holds the queue name same as the producer's queue name
        const queue_name = "new-queue-01";
        // channel creation is a session application that allows your express app to communicate with rabbitmq
        // await con.createChannel(); not necessairy
        // create queue
        await channel.assertQueue(queue_name,{durable: true});
        // consume the message held by the queue
        await channel.consume(queue_name,function(message){
            // display the message to the consumer console
            console.log(message.content.toString());
            // consumer tell the producer it received and consumed the data, acknowledgement message
            channel.ack(message);
            // give a custom name to the consumer
        },{consumerTag: "Consumer1"})                
        
    }).catch((error)=>{
        console.log("connection issue, please try agagin in a few minute....");
    })

}


// call the function consumer
consumer();