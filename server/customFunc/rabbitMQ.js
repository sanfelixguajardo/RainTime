const amqplib = require('amqplib');

const options = {
    protocol: 'amqp',
    hostname: 'rabbitmq',
    port: 5672,
    username: process.env.RABBITMQ_USER,
    password: process.env.RABBITMQ_PASSWORD,
    vhost: '/',
};

let connection;
let channel;

const establishConnection = async() => {
    if (!connection) {
        connection = await amqplib.connect(options);
    }

    if (!channel) {
        channel = await connection.createChannel();
    }
};

const consumeProgramStatusQueue = async () => {

    try {

        await establishConnection();

        const queue = 'program.status';
        await channel.assertQueue(queue, {durable: false});

        // Listener
        channel.consume(queue, (msg) => {
            if (msg !== null) {
                console.log('[X]: ', msg.content.toString());
                channel.ack(msg);
            } else {
                console.log('Consumer cancelled by server');
            }
        });

    } catch (err) {
        console.log(err);
    }

};

const sendProgramToQueue = async (program) => {
    try {

        await establishConnection();

        const queue = 'program.active';
        await channel.assertQueue(queue, {durable: false});

        await channel.sendToQueue(queue, Buffer.from(JSON.stringify(program)));

    } catch (err) {
        console.log(err);
    }
};

/* const consumeCameraFeedQueue = async (io) => {

    try {

        await establishConnection();

        const queue = 'camera.feed';
        await channel.assertQueue(queue, { durable: false });

        // Listener
        channel.consume(queue, (msg) => {
            if (msg !== null) {
                io.emit('frame', msg.content.toString());
                channel.ack(msg);
            } else {
                console.log('Consumer cancelled by server');
            }
        });

    } catch (err) {
        console.log(err);
    }

}; */

/*const sendStartStopFeedToQueue = async (status) => {
    try {

        await establishConnection();

        const queue = 'camera.active';
        await channel.assertQueue(queue, { durable: false });

        let command = '';

        if (status) {
            command = 'start_feed';
        } else {
            command = 'stop_feed';
        }

        await channel.sendToQueue(queue, Buffer.from(command));
        console.log(`cam: ${status}`);

    } catch (err) {
        console.log(err);
    }
};*/

module.exports = {
    consumeProgramStatusQueue,
    sendProgramToQueue,
}