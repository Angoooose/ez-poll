import Auth from '../components/Auth/Auth';
import Home from '../components/Home/Home';
import getAuth from '../utils/getAuth';
import AuthData from '../Types/AuthData';

export default function App({ isAuthed, user }: AuthData) {
  return isAuthed && user ? <Home userId={user.id}/> : <Auth/>;
}

export const getServerSideProps = getAuth;