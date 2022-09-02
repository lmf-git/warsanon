import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>Warsanon | Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <p>Warsanon</p>
      <Link href="/map">Map</Link>
      <img width="300" src="https://cdn.discordapp.com/attachments/942925848258940941/980950028929601596/4FB7E5FB-C3BE-4401-8B1F-2E980445038A-2.jpg" />
    </>
  )
}
