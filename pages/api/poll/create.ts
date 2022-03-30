import type { NextApiRequest, NextApiResponse } from 'next';
import generateUuid from '../../../utils/generateUuid';
import database from '../../../utils/database';
import Poll from '../../../Types/Poll';

interface CreateResponse {
    message: string,
    code: number,
    pollId?: string,
}

export default async function handler({ body }: NextApiRequest, res: NextApiResponse<CreateResponse>) {
    return new Promise<void>(async resolve => {
        const { ownerId, choices, endsAt, title, description } = JSON.parse(body) as Poll;
        const uuid = await generateUuid('polls');
        database.query('INSERT INTO polls (id, owner_id, choices, ends_at, title, description) VALUES ($1, $2, $3, $4, $5, $6)', [uuid, ownerId, JSON.stringify(choices), endsAt, title, description]).then(() => {
            res.status(200).send({ message: 'Poll created', code: 1, pollId: uuid });
            resolve();
        }).catch((err) => {
            console.error(err);
            res.status(500).send({ message: 'Internal Server Error', code: 0 });
            resolve();
        });
    });
}