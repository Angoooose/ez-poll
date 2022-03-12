import '../index.css';
import type { AppProps } from 'next/app';
import Header from '../components/Header/Header';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-neutral-800 text-white h-screen w-full">
      <Header isAuthed={pageProps.isAuthed}/>
      <Component {...pageProps} />
    </div>
  );
}