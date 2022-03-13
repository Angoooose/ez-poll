import Auth from '../components/Auth/Auth';
import CreatePoll from '../components/CreatePoll/CreatePoll';
import AuthData from '../Types/AuthData';
import getAuth from '../utils/getAuth';

export default function Create({ isAuthed, user }: AuthData) {
    return isAuthed && user ? <CreatePoll userId={user.id}/> : <Auth/>;
}

export const getServerSideProps = getAuth;