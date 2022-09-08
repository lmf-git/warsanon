import Head from 'next/head';
import { useEffect, useMemo, useState } from "react";

import { setup } from "lib/map/controls";
import { drawTiles, load_tiles } from "lib/map/visual";

import MapConfig from '../lib/map/map';
import Map from '@components/Map/Map';
import Minimap from '@components/Minimap/Minimap';

import styles from '@components/Map/Map.module.css';

export default function MapPage() {
  const [position, setPosition] = useState({ x: 500, y: 500 });
  const [horizontalTileNum, setHorizontalTileNum] = useState(10);
  const [visibleRows, setVisibleRows] = useState([]);

  // Share to rest of client.
  MapConfig.viewport.horizontalTileNum = horizontalTileNum;
  MapConfig.viewport.setHorizontalTileNum = setHorizontalTileNum;
  MapConfig.viewport.position = position;
  MapConfig.viewport.setPosition = setPosition;

  useEffect(
    () => setVisibleRows(drawTiles(position)),
   [position.x, position.y, horizontalTileNum]
  );

  useEffect(() => {
    setTimeout(() => {
      const newPosition = { x: 505, y: 505 };

      // Test updating position
      setPosition(newPosition);
    }, 2000);
  }, []);

  return <>
    <Head>
      <title>Warsanon | Map</title>
    </Head>

    <div className={styles['map-branding']}>
      <img className={styles['map-branding-logo']} src="/logo.png" />
    </div>
    
    <div className={styles['map-overview']}>
      <div className={styles['terrain']}>
        <Map visibleRows={visibleRows} />
        <Minimap visibleRows={visibleRows} />
      </div>
      <div className={styles['sidebar']}>
        Test
      </div>
    </div>
  </>
}
