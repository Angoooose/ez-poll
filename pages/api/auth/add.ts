import type { NextApiRequest, NextApiResponse } from 'next';
import pgConfig from '../../../postgres.config.json';
import { Pool } from 'pg';

export default async function handler({ body }: NextApiRequest, res: NextApiResponse) {
    const { email, password } = JSON.parse(body);
    const pool = new Pool(pgConfig);
    const existQueury = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existQueury.rowCount === 0) {
        pool.query('INSERT INTO users (email, password) VALUES ($1, $2)', [email, password]).then(() => {
            res.status(204).json({ message: 'Account created', code: 1 });
        }).catch((err) => {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error', code: 0 });
        });
    } else {
        res.status(409).json({ message: 'Account already exists', code: 0 });
    }
}