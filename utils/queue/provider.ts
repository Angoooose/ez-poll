import amqp from 'amqplib';

export async function publishMsg(msg: string): Promise<void> {
    const client = await amqp.connect(`amqp://${process.env.NODE_ENV === 'production' ? 'rabbitmq' : 'localhost'}:5672`);
    const channel = await client.createChannel();
    await channel.assertQueue('votes');
    channel.sendToQueue('votes', Buffer.from(msg));
    channel.close();
}