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

      <img src="/easteregg/picnic.png" style={{ 
        bottom: '2em',
        position: 'absolute', zIndex: -1, display: 'flex', flexWrap: 'wrap',
        left: '3.5em', alignItems: 'center'
      }} />

      <img src="/easteregg/ryan.png" style={{ 
        bottom: '.5em',
        position: 'absolute', zIndex: -1, display: 'flex', flexWrap: 'wrap',
        right: '2.4em', alignItems: 'center'
      }} />

      <img src="/easteregg/coop.png" style={{ 
        bottom: '4.1em',
        position: 'absolute', zIndex: -1, display: 'flex', flexWrap: 'wrap',
        right: '50%', alignItems: 'center'
      }} />

      <img src="/easteregg/alex.png" style={{ 
        top: '4em',
        width: '7em',
        position: 'absolute', zIndex: -1, display: 'flex', flexWrap: 'wrap',
        left: '3em', alignItems: 'center'
      }} />

      {/* 
      <div style={{ 
        marginTop: '20em',
        position: 'absolute', zIndex: -1, display: 'flex', flexWrap: 'wrap',
        justifyContent: 'flex-end', alignItems: 'center'
      }}>
        <img width="250" src="/easteregg/charlie.png" />
        <img src="/easteregg/ryan.png" />
        <img src="/easteregg/coop.png" />
      </div> 
      */}

      <div className={[styles.roadmap, 'panel'].join(' ')}>
        <h2>Roadmap</h2>
        <ul className={styles['roadmap-list']}>
          
          

          <li>Coordinate pointer number top right</li>

          <li>Load from query params</li>

          <li>Mobile drag</li>
          <li>Zoom</li>

          <li>-</li>

          <li>-</li>
          <li>Add player spawned to game world/chat log</li>
          <li>Pick Spawn</li>
          <li>-</li>

          <li>Moving</li>
          <li>Fighting</li>
          <li>Dying</li>
          <li>Gathering</li>
          <li>Building</li>
          <li>Trading</li>
          <li>Admin world create seed + spawns</li>
        </ul>

        <h2>Completed</h2>
        <ul className={styles['roadmap-list']} style={{ height: '10em', overflowY: 'scroll', textDecoration: 'line-through' }}>
          <li>Add crosshair</li>
          <li>Map centered offset</li>
          <li>Load before position change</li>
          <li>Move camera when selecting spawns</li>
          <li>Track loaded chunks</li>
          <li>Load tiles around center to fill out map</li>
          <li>Move viewport to coordinate centred</li>
          <li>Simulate some game log events</li>
          <li>Click/select tiles</li>
          <li>Chat/game log feed</li>
          <li>Chunk positioning</li>
          <li>Resize</li>
          <li>Drag</li>
          <li>HTML approach to map</li>
          <li>Load Spawns</li>
          <li>World user count</li>
          <li>Add profile link</li>
          <li>Complete profile/Onboarding</li>
          <li>Allow avatar</li>
          <li>Login</li>
          <li>World select</li>
          <li>World register</li>
          <li>Add AuthContext and useAuthContext</li>
          <li>Create protected/incomplete profile guard as effect</li>
        </ul>
      </div>
    </Layout>
  )
}