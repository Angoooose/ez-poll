import type { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import pgConfig from '../../../postgres.config.json';
import { Pool } from 'pg';
import sessionCookie from '../../../utils/sessionCookie';

export default withIronSessionApiRoute(
  async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
    const { email, password } = JSON.parse(req.body);
    console.log(`${email} - ${password}`);
    const pool = new Pool(pgConfig);
    const userQuery = await pool.query('SELECT id FROM users WHERE email = $1 AND password = $2 LIMIT 1', [email, password]);
    console.log(userQuery);
    if (userQuery.rowCount > 0) {
        req.session.user = userQuery.rows[0];
        await req.session.save();
        res.status(200).send({ message: 'Logged in', code: 1 });
    } else {
        res.status(404).send({ message: 'Invalid username or password', code: 0 });
    }
  }, sessionCookie);