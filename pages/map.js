import Head from 'next/head';
import dynamic from 'next/dynamic';

export default function Home() {

  const GameMap = dynamic(() => import('../components/GameMap'), {
    ssr: false
  });

  return (
    <div className="container">
      <Head>
        <title>Game</title>
      </Head>

      <GameMap />
    </div>
  )
}
