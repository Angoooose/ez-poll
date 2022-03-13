import type { NextApiRequest, NextApiResponse } from 'next';
import pgConfig from '../../../postgres.config.json';
import { Pool } from 'pg';
import generateUuid from '../../../utils/generateUuid';
import Poll from '../../../Types/Poll';

interface CreateResponse {
    message: string,
    code: number,
    pollId?: string,
}

export default async function handler({ body }: NextApiRequest, res: NextApiResponse<CreateResponse>) {
    const { ownerId, choices, endsAt } = JSON.parse(body) as Poll;
    const pool = new Pool(pgConfig);
    const uuid = await generateUuid('polls');
    console.log(`${ownerId} - ${endsAt}`);
    pool.query('INSERT INTO polls (id, owner_id, choices, ends_at) VALUES ($1, $2, $3, $4)', [uuid, ownerId, JSON.stringify(choices), endsAt]).then(() => {
        res.status(200).send({ message: 'Poll created', code: 1, pollId: uuid });
    }).catch((err) => {
        console.error(err);
        res.status(500).send({ message: 'Internal Server Error', code: 0 });
    });
}