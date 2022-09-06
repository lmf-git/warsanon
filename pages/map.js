import Head from 'next/head';
import { useEffect, useMemo, useState } from "react";

import { setup } from "lib/map/controls";
import { drawTiles, load_tiles } from "lib/map/visual";

import MapConfig from '../lib/map/map';
import Map from '@components/Map';
import Minimap from '@components/Minimap';

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
    
    <div id="map-overview">
      <Map visibleRows={visibleRows} />
      <Minimap visibleRows={visibleRows} />
    </div>
  </>
}
