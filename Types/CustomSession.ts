import { IronSession } from 'iron-session';

export default interface CustomSession extends IronSession {
    user: {
        id: string,
    },
}