import amqp from 'amqplib';

// const _url = "amqp://guest:guest@localhost:5672";
const _url = {
    username: "joel",
    password: "12345",
    port:"5672",
    hostname: "172.20.10.13", //bringing back later//
};


function consumer(){
    amqp.connect(_url, (error)=>{
        if(error){
            throw error;
        }
        
       
    }).then(async (con)=>{        
        const channel = await con.createChannel();    
        const queue = "new-queue-01";
        await con.createChannel();
        await channel.assertQueue(queue,{durable: true});
        await channel.consume(queue,function(msg){
            console.log(msg.content.toString());
            channel.ack(msg);
        },{consumerTag: "Consumer1"})
        
        
        
    })

}



consumer();