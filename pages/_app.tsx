import '../index.css';
import type { AppProps } from 'next/app';
import Header from '../components/Header/Header';
import { Toaster } from 'react-hot-toast';
import { SocketContextProvider } from '../contexts/SocketContext';
import Head from 'next/head';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SocketContextProvider>
        <Head>
          <title>ez-poll</title>
          <link rel="icon" href="/favicon.ico" />
          <meta property="og:title" content="ez-poll" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://polls.angoose.dev/" />
          <meta property="og:description" content="A polling web application built with NextJS, TailwindCSS, PostgreSQL, RabbitMQ, and Docker." />
        </Head>
        <div className="bg-neutral-800 text-white min-h-screen w-full overflow-x-hidden">
          <Header isAuthed={pageProps.isAuthed}/>
          <Component {...pageProps} />
          <Toaster
            position="bottom-center"
            toastOptions={{
                style: {
                  backgroundColor: '#404040',
                  borderRadius: '20px',
                  color: 'white',
                }
            }}
          />
        </div>
    </SocketContextProvider>
  );
}