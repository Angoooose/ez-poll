import type { NextApiRequest, NextApiResponse } from 'next';
import generateUuid from '../../../utils/generateUuid';
import database from '../../../utils/database';

export default async function handler({ body }: NextApiRequest, res: NextApiResponse) {
    const { email, password } = JSON.parse(body);
    const existQueury = await database.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existQueury.rowCount === 0) {
        const uuid = await generateUuid('users');
        console.log(uuid);
        database.query('INSERT INTO users (id, email, password) VALUES ($1, $2, $3)', [uuid, email, password]).then(() => {
            res.status(204).send({ message: 'Created account', code: 1 });
        }).catch((err) => {
            console.error(err);
            res.status(500).send({ message: 'Internal Server Error', code: 0 });
        });
    } else {
        res.status(409).send({ message: 'Account already exists', code: 0 });
    }
}