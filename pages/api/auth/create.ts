import type { NextApiRequest, NextApiResponse } from 'next';
import pgConfig from '../../../postgres.config.json';
import { Pool } from 'pg';
import generateUuid from '../../../utils/generateUuid';

export default async function handler({ body }: NextApiRequest, res: NextApiResponse) {
    const { email, password } = JSON.parse(body);
    const pool = new Pool(pgConfig);
    const existQueury = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existQueury.rowCount === 0) {
        const uuid = await generateUuid('users');
        console.log(uuid);
        pool.query('INSERT INTO users (id, email, password) VALUES ($1, $2, $3)', [uuid, email, password]).then(() => {
            res.writeHead(302, {
                'Location': '/api/auth/login',
            });
            res.end();
        }).catch((err) => {
            console.error(err);
            res.status(500).send({ message: 'Internal Server Error', code: 0 });
        });
    } else {
        res.status(409).send({ message: 'Account already exists', code: 0 });
    }
}