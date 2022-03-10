import type { NextApiRequest, NextApiResponse } from 'next';
import pgConfig from '../../../postgres.config.json';
import { Pool } from 'pg';

export default async function handler({ body }: NextApiRequest, res: NextApiResponse) {
    const { email, password } = JSON.parse(body);
    const pool = new Pool(pgConfig);
    const user = await pool.query('SELECT * FROM users WHERE email = $1 AND password = $2 LIMIT 1', [email, password]);
    if (user.rowCount > 0) {
        res.status(200).json({ message: 'Logged in', code: 1 });
    } else {
        res.status(404).json({ message: 'Invalid username or password', code: 1 });
    }
}