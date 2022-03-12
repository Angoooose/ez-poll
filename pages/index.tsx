import { withIronSessionSsr } from 'iron-session/next';

import Auth from '../components/Auth/Auth';
import Header from '../components/Header/Header';
import Home from '../components/Home/Home';
import sessionCookie from '../utils/sessionCookie';

interface AppProps {
  isAuthed: boolean,
  user: {
    id: string,
  },
}

export default function App({ isAuthed }: AppProps) {
  return (
    <div className="bg-neutral-800 text-white h-screen w-full">
      <Header isAuthed={isAuthed}/>
      {
        !isAuthed ? (
          <Auth/>
        ) : (
          <Home/>
        )
      }
    </div>
  );
}

export const getServerSideProps = withIronSessionSsr(
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