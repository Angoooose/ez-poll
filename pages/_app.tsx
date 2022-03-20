import '../index.css';
import type { AppProps } from 'next/app';
import Header from '../components/Header/Header';
import { Toaster } from 'react-hot-toast';
import { SocketContextProvider } from '../contexts/SocketContext';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SocketContextProvider>
        <div className="bg-neutral-800 text-white min-h-screen w-full overflow-x-hidden">
          <Header isAuthed={pageProps.isAuthed}/>
          <Component {...pageProps} />
          <Toaster/>
        </div>
    </SocketContextProvider>
  );
}