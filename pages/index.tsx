import type { NextPage } from 'next';
import Auth from '../components/Auth/Auth';
import Header from '../components/Header/Header';

const Home: NextPage = () => {
  return (
    <div className="bg-neutral-800 text-white h-screen w-full">
      <Header/>
      <Auth/>
    </div>
  );
}

export default Home;