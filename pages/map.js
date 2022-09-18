import { useEffect, useState } from "react";
import Head from 'next/head';
import Link from 'next/link';

import MapConfig from '../lib/map/mapConfig';
import useProtected from "lib/useProtected";
import useEntireScreen from "lib/useEntireScreen";

import Map from '@components/Map/Map';

import styles from '@components/Map/Map.module.css';

export default function MapPage() {
  useProtected();
  useEntireScreen();

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // const [visibleRows, setVisibleRows] = useState([]);

  // Share to rest of client.
  MapConfig.viewport.position = position;
  MapConfig.viewport.setPosition = setPosition;

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
        <Map />
      </div>
      { !sidebarOpen ? null :
        <div className={styles['sidebar']}>
          Test
        </div>
      }
    </div>
  </>
}
