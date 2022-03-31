import type { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import database from '../../../utils/database';
import sessionCookie from '../../../utils/sessionCookie';
import CustomSession from '../../../Types/CustomSession';

export default withIronSessionApiRoute(
  async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
    const { email, password } = JSON.parse(req.body);
    const userQuery = await database.query('SELECT id FROM users WHERE email = $1 AND password = $2 LIMIT 1', [email, password]);
    if (userQuery.rowCount > 0) {
        const session = req.session as CustomSession;
        session.user = userQuery.rows[0];
        await req.session.save();
        res.status(200).send({ message: 'Logged in', code: 1 });
    } else {
        res.status(404).send({ message: 'Invalid username or password', code: 0 });
    }
  }, sessionCookie);