import { IronSessionOptions } from 'iron-session';

const sessionCookie: IronSessionOptions = {
    cookieName: 'poll_auth',
    password: 'bYwnuXnbuguUL6q9yW1Dd65DMbsP2fge',
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
    },
};

export default sessionCookie;