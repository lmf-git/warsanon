import { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

import styles from '@components/Home/Home.module.css';

export default function Home() {

  return (
    <>
      <Head>
        <title>Warsanon | Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.header}>
        <div className={styles.branding}>
          <img className={styles.logo} src="/logo.png" />

          <div className={styles['branding-text']}>
            <h1 className={styles['branding-title']}>Warsanon</h1>
            <p className={styles['branding-slogan']}>Medeival fantasy strategy web game</p>
          </div>
        </div>

        <div className={styles['header-actions']}>
          <Link href="/map">
            <a className={styles['header-actions-item']}>
              Play
            </a>
          </Link>
          <br />
          <Link href="/login">
            <a className={styles['header-actions-item']}>
              Login
            </a>
          </Link>
        </div>
      </div>

      <div className={styles.roadmap}>
        <h2>News</h2>
        <ul>
          <li>Login</li>
        </ul>
      </div>

      <div className={styles.roadmap}>
        <h2>Roadmap</h2>
        <ul>
          <li>Login</li>
          <li>World select </li>
          <li>Position</li>
          <li>Dying</li>
        </ul>
      </div>
    </>
  )
}