import amqp from 'amqplib';
import { Socket } from 'socket.io';
import pgConfig from '../../postgres.config.json';
import { Pool } from 'pg';
import PollChoice from '../../Types/PollChoice';

export async function startConsumer(socket: Socket): Promise<void> {
    const client = await amqp.connect('amqp://localhost:5672');
    const channel = await client.createChannel();
    await channel.assertQueue('votes');

    socket.once('disconnect', () => {
        channel.close();
    });

    channel.consume('votes', async (msg) => {
        if (!msg) return;
        const msgContent = msg.content.toString();
        const pollId: string = msgContent.split('-')[0];
        const choiceIndex: number = parseInt(msgContent.split('-')[1]);
        const pool = new Pool(pgConfig);
        const pollQuery = await pool.query('SELECT choices FROM polls WHERE id = $1 LIMIT 1', [pollId]);
        if (pollQuery.rowCount > 0) {
            let pollChoices: PollChoice[] = pollQuery.rows[0].choices;
            pollChoices[choiceIndex].votes++;
            await pool.query('UPDATE polls SET choices = $1 WHERE id = $2', [JSON.stringify(pollChoices), pollId]);
            socket.emit(pollId, choiceIndex);
        }

        channel.ack(msg);
    });
}