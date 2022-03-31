import { withIronSessionSsr } from 'iron-session/next';
import sessionCookie from '../utils/sessionCookie';
import CustomSession from '../Types/CustomSession';

export default withIronSessionSsr(
    async function getServerSideProps({ req }) {
        const session = req.session as CustomSession;

        if (!session.user) {
            return {
                props: {
                    isAuthed: false,
                    user: {
                        id: '',
                    },
                }
            };
        }

        return {
            props: {
                isAuthed: true,
                user: session.user,
            },
        };
}, sessionCookie);