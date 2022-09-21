import { useEffect, useState } from "react";
import Head from 'next/head';
import Link from 'next/link';

import MapConfig from '../lib/map/mapConfig';
import useProtected from "lib/useProtected";
import useEntireScreen from "lib/useEntireScreen";

import MapGUI from '@components/Game/Map/MapGUI';
import SpawnOverlay from "@components/Game/Map/SpawnOverlay/SpawnOverlay";
import GameManager from "lib/gameManager";

import styles from '@components/Game/Map/MapGUI.module.css';

export default function MapPage() {
  const [overlay, setOverlay] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Share to rest of client.
  MapConfig.viewport.position = position;
  MapConfig.viewport.setPosition = setPosition;

  useProtected();
  useEntireScreen();

  // Bootstrap game.
  // Will need a guard to always redirect to map unless spawned.
  useEffect(() => GameManager.bootstrap(setOverlay), []);

  return <>
    <Head>
      <title>Warsanon | Map</title>
    </Head>

    <div className={styles['map-branding']}>
      <Link href="/worlds">
        <a className={styles['map-logo-link']}>
          <img className={styles['map-branding-logo']} src="/logo.png" />
        </a>
      </Link>
    </div>
    
    <div className={styles['map-overview']}>
      <div id="map-container" className={styles['terrain']}>
        <MapGUI />
      </div>
      { !sidebarOpen ? null :
        <div className={styles['sidebar']}>
          Test
        </div>
      }
      { overlay === 'spawn' ? <SpawnOverlay setOverlay={setOverlay} /> : null }
    </div>
  </>
}
