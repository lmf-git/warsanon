import { useEffect, useState } from "react";
import Head from 'next/head';
import Link from 'next/link';

import MapManager from '../lib/map/mapManager';
import MapConfig from '../lib/map/mapConfig';
import useProtected from "lib/useProtected";
import useEntireScreen from "lib/map/useEntireScreen";

import MapGUI from '@components/Game/Map/MapGUI';
import SpawnOverlay from "@components/Game/Map/SpawnOverlay/SpawnOverlay";

import Log from "@components/Game/Map/Log/Log";
import Tooltip from "@components/Game/Map/Tooltip/Tooltip";

import styles from '@components/Game/Map/MapGUI.module.css';
import { useRouter } from "next/router";

export default function MapPage() {
  const router = useRouter();
  const [overlay, setOverlay] = useState(null);
  const [position, setPosition] = useState({ x: 500, y: 500 });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [chunks, setChunks] = useState([]);

  useEffect(() => {
    if (router.query.x || router.query.y) {
      const { x, y } = router.query;
      
      const newPosition = {
        x: parseInt(x) || position.x,
        y: parseInt(y) || position.y,
      };

      setPosition(newPosition);
    }
  }, [router]);

  
  // Share rendering to React.
  MapConfig.viewport.chunks = chunks;
  MapConfig.viewport.setChunks = setChunks;

  // Share to rest of client.
  MapConfig.viewport.position = position;
  MapConfig.viewport.setPosition = setPosition;

  useProtected();
  useEntireScreen();

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
        <MapGUI 
          setOverlay={setOverlay} 
          chunks={chunks} 
          position={position} 
        />
      </div>
      { !sidebarOpen ? null :
        <div className={styles['sidebar']}>
          Test
        </div>
      }

      <Tooltip position={position} />

      <Log />

      { overlay === 'spawn' ? <SpawnOverlay setPosition={setPosition} setOverlay={setOverlay} /> : null }
      {/* { overlay === 'class' ? <ClassSelectOverlay setOverlay={setOverlay} /> : null } */}
    </div>
  </>
}
