import Head from 'next/head';
import dynamic from 'next/dynamic';

export default function Home() {
  const GameMap = dynamic(() => import('../components/GameMap'), { ssr: false });

  return (
    <>
      <Head>
        <title>Warsanon | Map</title>
      </Head>

      <GameMap />
    </>
  )
}
