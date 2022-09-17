import Head from 'next/head';

import Layout from '@components/Layout/Layout';
import styles from '@components/Home/Home.module.css';


export default function Home({ auth }) {

  // TODO: Check if logged in, in the layout to dictate buttons

  return (
    <Layout auth={auth}>
      <Head>
        <title>Warsanon | Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={[styles.roadmap, 'panel'].join(' ')}>
        <h2>News</h2>
        <ul>
          <li>Login</li>
          <li>Now open source <a href="https://github.com/lmf-git/warsanon">on github.</a></li>
        </ul>
      </div>

      <div className={[styles.roadmap, 'panel'].join(' ')}>
        <h2>Roadmap</h2>
        <ul>
          <li><s>Login</s></li>
          <li><s>World select</s></li>
          <li><s>World register</s></li>
          <li><s>Add AuthContext and useAuthContext</s></li>
          <li>Create protected/incomplete profile guard as effect</li>
          <li>Change auth and account useEffects to their own hooks</li>
          <li>Complete profile/Onboarding - QR code/add app to phone/notifications/promote something</li>
          <li>Spawn</li>
          <li>Position</li>
          <li>Dying</li>
        </ul>
      </div>
    </Layout>
  )
}



