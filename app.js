import express from 'express';
import amqp from 'amqplib';
import bodyParser from 'body-parser';


const app = express();
const port = 8001;
// const _url = "amqp://guest:guest@localhost:5672";
const _url = {
    username: "joel",
    password: "12345",
    port:"5672",
    hostname: "172.20.10.13", //bringing back later//
};
let connection = null;

app.use(bodyParser.json("application/json"))

amqp.connect(_url,(error)=>{
    if(error){
        throw error;
    }

}).then((conn)=>{
    connection = conn;
})


async function producer(connection, msg){
    const channel = await connection.createChannel();

    const exch = "route";
    const key = "exch-key";
    const queue = "new-queue-01";

    channel.assertExchange(exch,"direct",{durable: false},{confirm: true});
    channel.assertQueue(queue,{durable: true});
    channel.bindQueue(queue,exch,key);

    try {
        channel.publish(exch,key,Buffer.from(msg))        
    } catch (error) {
        console.log("something went wrong, try to connect in a few minutes...");
    }

    setTimeout(()=>{
        channel.close();
        connection.close();
    },500)

}

app.post("/api/messages", (req, res)=>{

    producer(connection, JSON.stringify(req.body));

    res.send("message sent successfully...");
})

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}...`);
})

