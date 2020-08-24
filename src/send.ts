import * as amqp from 'amqplib/callback_api';

let myChannel : amqp.Channel = null;

export const queueName : string = 'myQueueName';
export const publishToQueue = async (queueName : string, data: any) => {
    myChannel.sendToQueue(queueName, new Buffer(data), {persistent: true});
}

console.log('init connect amqp');
amqp.connect('amqp://localhost', function (error0: Error, connection: amqp.Connection) {
    if (error0) {
        console.log('error detected on amqp.connect!');
        console.log(error0);
        throw error0;
    }
    console.log('connected to amqp.connect');
    connection.createChannel(function (error1: Error, channel: amqp.Channel) {
        if (error1) {
            console.log('error detected on connection.createChannel!');
            console.log(error1);
            throw error1;
        }
        myChannel = channel;

        console.log('createChannel finished!');
        var msg: string = 'Hello world';

        channel.assertQueue(queueName, {
            durable: false
        });

        channel.sendToQueue(queueName, Buffer.from(msg));
        console.log(" [x] Sent %s", msg);

    });

    // setTimeout(function () {
    //     connection.close();
    //     process.exit(0)
    // }, 500);
});
