import type { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import database from '../../../utils/database';
import sessionCookie from '../../../utils/sessionCookie';
import CustomSession from '../../../Types/CustomSession';

export default withIronSessionApiRoute(
    async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
        return new Promise(async resolve => {
            const { pollId } = JSON.parse(req.body);
            const session = req.session as CustomSession;
            const pollQuery = await database.query('SELECT owner_id FROM polls WHERE id = $1 LIMIT 1', [pollId]);
            if (pollQuery.rowCount > 0) {
                if (pollQuery.rows[0].owner_id === session.user.id) {
                    database.query('DELETE FROM polls WHERE id = $1', [pollId]).then(() => {
                        res.status(200).send({ message: 'Poll deleted', code: 0 });
                        resolve();
                    }).catch(() => {
                        res.status(500).send({ message: 'Internal Server Error', code: 0 });
                        resolve();
                    });
                } else {
                    res.status(401).send({ message: 'Unauthorized', code: 0 });
                    resolve();
                }
            } else {
                res.status(404).send({ message: 'Not found', code: 0 });
                resolve();
            }
        });
    }, sessionCookie);