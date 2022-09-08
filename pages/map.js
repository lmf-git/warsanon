import Head from 'next/head';
import { useEffect, useMemo, useState } from "react";

import { setup } from "lib/map/controls";
import { drawTiles, load_tiles } from "lib/map/visual";

import MapConfig from '../lib/map/map';
import Map from '@components/Map/Map';
import Minimap from '@components/Minimap/Minimap';

import styles from '@components/Map/Map.module.css';
import Link from 'next/link';

export default function MapPage() {
  const [position, setPosition] = useState({ x: 500, y: 500 });
  const [horizontalTileNum, setHorizontalTileNum] = useState(10);
  const [visibleRows, setVisibleRows] = useState([]);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Share to rest of client.
  MapConfig.viewport.horizontalTileNum = horizontalTileNum;
  MapConfig.viewport.setHorizontalTileNum = setHorizontalTileNum;
  MapConfig.viewport.position = position;
  MapConfig.viewport.setPosition = setPosition;

  useEffect(
    () => {
      // ...
      document.documentElement.classList.add(styles['map-window']);

      // Add map-fullheight class to html and body
      [document.body, document.documentElement, document.querySelector('#__next')]
        .map(el => el.classList.add(styles['map-fullheight']));

      setVisibleRows(drawTiles(position))


      return function cleanup() {
        // ...
        document.documentElement.classList.remove(styles['map-window']);

        // remove map-fullheight class to html and body
        [document.body, document.documentElement, document.querySelector('#__next')]
          .map(el => el.classList.remove(styles['map-fullheight']));

      }
    },
   [position.x, position.y, horizontalTileNum]
  );

  useEffect(() => {
    setTimeout(() => {
      const newPosition = { x: 505, y: 505 };

      // Test updating position
      setPosition(newPosition);

      // Dev
      setSidebarOpen(true);
    }, 2000);
  }, []);

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
      <div className={styles['terrain']}>
        <Map visibleRows={visibleRows} />
        <Minimap visibleRows={visibleRows} />
      </div>
      { !sidebarOpen ? null :
        <div className={styles['sidebar']}>
          Test
        </div>
      }
    </div>
  </>
}
