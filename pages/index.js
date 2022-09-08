import Head from 'next/head';

import Layout from '@components/Layout/Layout';
import styles from '@components/Home/Home.module.css';

export default function Home() {

  return (
    <Layout>
      <Head>
        <title>Warsanon | Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={[styles.roadmap, 'panel'].join(' ')}>
        <h2>News</h2>
        <ul>
          <li>Login</li>
        </ul>
      </div>

      <div className={[styles.roadmap, 'panel'].join(' ')}>
        <h2>Roadmap</h2>
        <ul>
          <li>Login</li>
          <li>World select </li>
          <li>Position</li>
          <li>Dying</li>
        </ul>
      </div>
    </Layout>
  )
}