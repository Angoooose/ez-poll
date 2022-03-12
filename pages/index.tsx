import Auth from '../components/Auth/Auth';
import Home from '../components/Home/Home';
import getAuth from '../utils/getAuth';
import { default as AuthType } from '../Types/Auth';

export default function App({ isAuthed }: AuthType) {
  return isAuthed ? <Home/> : <Auth/>;
}

export const getServerSideProps = getAuth;