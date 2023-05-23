// import library express to build my server
import express from 'express';
// import amqp library to build my microservice application
import amqp from 'amqplib';
// import body-parser to parse data from the req.body
import bodyParser from 'body-parser';

// declare a constant app and assign my express framework to build my application
const app = express();
// declare a constant port and assign the port number used to run my application
const port = 8001;
// const _url = "amqp://guest:guest@localhost:5672";
// url is use to connect rabbitmq (username, password, port) and the localhost my pc ip address
const amqp_config = {
    username: "joel",
    password: "12345",
    port:"5672",
    hostname: "192.168.1.175", //bringing back later//
};
// decalre a variable connection to hold the rabbitmq connection
let connection = null;
// add bodyParser middleware use to process data sent to an http body request
app.use(bodyParser.json("application/json"));
// app.use(express.json())
// connection to rabbitmq that leads to a promise
amqp.connect(amqp_config,(error)=>{
    if(error){
        throw error;
    }
// using of .then to retrieve the connection and assign to the connection variable
}).then((conn)=>{
    connection = conn;
}).catch((e)=>{
    console.log("failed to connect, try again in a few minute...");
})

// async function producer that accepts two parameter connection to rabbitmq and the message to publish to the queue
async function producer(connection, message){
    // try catch bloc is use to test a bloc of code and display a specific output when catch an error
    try {
        // channel creation is a session application that allows your express app to communicate with rabbitmq
        const channel = await connection.createChannel();
        // declare a constant that holds exchange name
        const exchange = "route";
        // declare a constant that holds key or address use to deliver the message
        const key = "exch-key";
        // declare a constant queue that holds the queue name
        const queue_name = "new-queue-01";

        // create exchange that acts as a routing to receive message from producer and push them to message queues
        channel.assertExchange(exchange,"direct",{durable: false},{confirm: true});
        // create queue to store message
        channel.assertQueue(queue_name,{durable: true});
        // bind the the queue to provide queue name - routing - address to inform where store the message
        channel.bindQueue(queue_name,exchange,key);        
        channel.publish(exchange,key,Buffer.from(message))    
        // set a timer to close the channel and the connection after 0.5 second
        setTimeout(()=>{
            channel.close();
            connection.close();
        },1000)
        
    } catch (error) {
        // the message display when error caught
        console.log("failed to create channel, try to connect in a few minutes...");
    }


}
// post request to request data from "api/messages"
app.post("/api/messages", (req, res)=>{
    // calling function producer with parameters connection and req.body the data to be send to the queue
    producer(connection, JSON.stringify(req.body));
    // send the response after execute the above function if is executed successfully
    res.send("message sent successfully...");
})
// tell the app to listen to that port and if it available run the app to that port
app.listen(port, ()=>{
    // log to the console this string when the server is running successfully
    console.log(`Server is running on port ${port}...`);
})

