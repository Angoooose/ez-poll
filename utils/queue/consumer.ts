import amqp from 'amqplib';
import { Server } from 'socket.io';
import database from '../database';
import PollChoice from '../../Types/PollChoice';

export async function startConsumer(io: Server): Promise<void> {
    const client = await amqp.connect('amqp://localhost:5672');
    const channel = await client.createChannel();
    await channel.assertQueue('votes');

    channel.consume('votes', async (msg) => {
        if (!msg) return;
        const msgContent = msg.content.toString();
        const pollId: string = msgContent.split('-')[0];
        const choiceIndex: number = parseInt(msgContent.split('-')[1]);
        const pollQuery = await database.query('SELECT owner_id, choices FROM polls WHERE id = $1 LIMIT 1', [pollId]);
        if (pollQuery.rowCount > 0) {
            let pollChoices: PollChoice[] = pollQuery.rows[0].choices;
            pollChoices[choiceIndex].votes++;
            await database.query('UPDATE polls SET choices = $1 WHERE id = $2', [JSON.stringify(pollChoices), pollId]);
            io.emit(pollId, choiceIndex);
            io.emit(`userUpdate-${pollQuery.rows[0].owner_id}`, {
                id: pollId,
                choices: pollChoices,
            });
        }

        channel.ack(msg);
    });
}