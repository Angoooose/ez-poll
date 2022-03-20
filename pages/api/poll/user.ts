import type { NextApiRequest, NextApiResponse } from 'next';
import pgConfig from '../../../postgres.config.json';
import { Pool } from 'pg';
import Poll from '../../../Types/Poll';

export default async function handler({ query }: NextApiRequest, res: NextApiResponse<Poll[]>) {
    const { userId } = query;
    const pool = new Pool(pgConfig);
    const pollQuery = await pool.query('SELECT * FROM polls WHERE owner_id = $1', [userId]);
    res.send(pollQuery.rows.map(p => ({
        id: p.id,
        ownerId: p.owner_id,
        endsAt: parseInt(p.ends_at),
        title: p.title,
        description: p.description,
        choices: p.choices,
    })));
}