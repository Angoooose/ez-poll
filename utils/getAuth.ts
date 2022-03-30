import { IronSession } from 'iron-session';
import { withIronSessionSsr } from 'iron-session/next';
import sessionCookie from '../utils/sessionCookie';

interface CustomSession extends IronSession {
    user: {
        id: string,
    },
}

export default withIronSessionSsr(
    async function getServerSideProps({ req }) {
        const session = req.session as CustomSession;
        const user = session.user.id;

        if (!user) {
            return {
                props: {
                    isAuthed: false,
                    user: '',
                }
            };
        }

        return {
            props: {
                isAuthed: true,
                user,
            },
        };
}, sessionCookie);