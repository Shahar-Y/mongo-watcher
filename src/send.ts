import * as amqp from 'amqplib/callback_api';
// var amqp = require('amqplib/callback_api');

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

        console.log('createChannel finished!');
        var queue: string = 'hello';
        var msg: string = 'Hello world';

        channel.assertQueue(queue, {
            durable: false
        });

        channel.sendToQueue(queue, Buffer.from(msg));
        console.log(" [x] Sent %s", msg);
    });

    setTimeout(function () {
        connection.close();
        process.exit(0)
    }, 500);
});

