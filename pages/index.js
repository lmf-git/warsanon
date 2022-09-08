import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>Warsanon | Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <img src="/logo.png" />

      <div>
        <p>Warsanon</p>
        <Link href="/map">Map</Link>
        <br />
        <Link href="/login">Login (DEV ONLY)</Link>
      </div>
    </>
  )
}
