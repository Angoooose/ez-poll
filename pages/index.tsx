import Auth from '../components/Auth/Auth';
import Home from '../components/Home/Home';
import getAuth from '../utils/getAuth';
import AuthData from '../Types/AuthData';

export default function App({ isAuthed }: AuthData) {
  return isAuthed ? <Home/> : <Auth/>;
}

export const getServerSideProps = getAuth;