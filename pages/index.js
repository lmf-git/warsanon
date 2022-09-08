import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>Warsanon | Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div style={{ padding: '1em' }}>
        <p>Warsanon</p>
        <Link href="/map">Map</Link>
        <br />
        <Link href="/login">Login (DEV ONLY)</Link>
      </div>

      <img width="150" src="/logo.png" />
    </>
  )
}
