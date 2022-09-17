import { useEffect, useState } from "react";
import Head from 'next/head';
import Link from 'next/link';

import MapConfig from '../lib/map/map';
import { makePageFullHeightViewport } from "lib/map/visual";

import Map from '@components/Map/Map';

import styles from '@components/Map/Map.module.css';

export default function MapPage() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // const [visibleRows, setVisibleRows] = useState([]);

  // Share to rest of client.
  MapConfig.viewport.position = position;
  MapConfig.viewport.setPosition = setPosition;

  // Make the page a full height/width viewport for easier sizing/positioning.µ
  useEffect(makePageFullHeightViewport, []);

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
