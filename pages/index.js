import Head from 'next/head';

import Layout from '@components/Layout/Layout';
import styles from '@components/Pages/Home/Home.module.css';


export default function Home() {
  // TODO: Check if logged in, in the layout to dictate buttons

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
          <li>Now open source <a href="https://github.com/lmf-git/warsanon">on github.</a></li>
        </ul>
      </div>

      <img src="/easteregg/knight.png" style={{ 
        right: '2em',
        position: 'absolute', zIndex: -1, display: 'flex', flexWrap: 'wrap',
        top: '7em', alignItems: 'center'
      }} />

      {/* <div style={{ 
        marginTop: '20em',
        position: 'absolute', zIndex: -1, display: 'flex', flexWrap: 'wrap',
        justifyContent: 'flex-end', alignItems: 'center'
      }}>
        <img width="250" src="/easteregg/charlie.png" />
        <img src="/easteregg/ryan.png" />
        <img src="/easteregg/coop.png" />
      </div> */}

      <div className={[styles.roadmap, 'panel'].join(' ')}>
        <h2>Roadmap</h2>
        <ul className={styles['roadmap-list']}>
          
          <li>Load tiles around center to fill out map</li>
          <li>Load Spawns</li>
          <li>Pick Spawn</li>
          <li>Position</li>
          <li>Dying</li>
          <li>Admin world create seed + spawns</li>
          <li>All tiles flash/image load/untidy</li>
          <li>Click/select tiles</li>
          <li><s>World user count</s></li>
          <li><s>Add profile link</s></li>
          <li><s>Complete profile/Onboarding</s></li>
          <li><s>Allow avatar</s></li>
          <li><s>Login</s></li>
          <li><s>World select</s></li>
          <li><s>World register</s></li>
          <li><s>Add AuthContext and useAuthContext</s></li>
          <li><s>Create protected/incomplete profile guard as effect</s></li>
        </ul>
      </div>
    </Layout>
  )
}