import { withIronSessionSsr } from 'iron-session/next';
import sessionCookie from '../utils/sessionCookie';

export default withIronSessionSsr(
    async function getServerSideProps({ req }) {
    const user = req.session.user;

    if (!user) {
        return {
            props: {
                isAuthed: false,
            }
        };
    }

    return {
        props: {
            isAuthed: true,
            user: req.session.user,
        },
    };
}, sessionCookie);