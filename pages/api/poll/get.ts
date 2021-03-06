import type { NextApiRequest, NextApiResponse } from 'next';
import database from '../../../utils/database';
import Poll from '../../../Types/Poll';

interface GetResponse {
    message: string,
    code: number,
}

export default async function handler({ query }: NextApiRequest, res: NextApiResponse<GetResponse|Poll>) {
    const { pollId } = query;
    const pollQuery = await database.query('SELECT * FROM polls WHERE id = $1 LIMIT 1', [pollId]);
    if (pollQuery.rowCount > 0) {
        const pollData = pollQuery.rows[0];
        res.status(200).send({
            id: pollData.id,
            ownerId: pollData.owner_id,
            endsAt: parseInt(pollData.ends_at),
            title: pollData.title,
            description: pollData.description,
            choices: pollData.choices,
        });
    } else {
        res.status(404).send({ message: 'Poll Not Found', code: 0 });
    }
}