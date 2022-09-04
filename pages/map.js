import Head from 'next/head';
import { useEffect, useMemo, useState } from "react";

import { setup } from "lib/map/controls";
import { draw_tiles, load_tiles } from "lib/map/visual";

import MapConfig from '../lib/map/map';

export default function Map() {
  const [position, setPosition] = useState({ x: 500, y: 500 });
  const [horizontalTileNum, setHorizontalTileNum] = useState(15);
  const [visibleRows, setVisibleRows] = useState([]);

  // Share to rest of client.
  MapConfig.viewport.horizontalTileNum = horizontalTileNum;
  MapConfig.viewport.setHorizontalTileNum = setHorizontalTileNum;
  MapConfig.viewport.position = position;
  MapConfig.viewport.setPosition = setPosition;

  useEffect(() => {
    // console.log('Re-render');

    // Draw foundational tiles separte from player and tile state data.
    const rows = draw_tiles(position);
    setVisibleRows([...rows]);

  }, [position.x, position.y, horizontalTileNum]);
  
  useEffect(() => {
    // Asynchronous loader, releasing to controls.
    const load = async () => {
      // Load the player and tile state data.
      // await load_tiles(setVisibleRows);

      // Attach controls for desktop, and resize initially.
      setup();
    };
    load();

    return function cleanup() {
      // Remove the event listeners
      // Remove the firebase listeners
    }
  }, []);

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

    <table id="map" width="100%">
        <thead></thead>
        <tbody>
        { 
          visibleRows.map((row, rowIndex) => 
            <tr key={`map-row-${rowIndex}`}>
              <td key={`map-row-help-${rowIndex}`}>i</td>
              {
                row.map((cell, cellIndex) => 
                  <td 
                    data-x={cell.x}
                    data-y={cell.y}
                    key={`map-row-${rowIndex}-cell-${cellIndex}`}>
                      <img width="100%" src="/logo.png" />
                      {/* {cell.x} | {cell.y} */}
                  </td>
                )
              }
            </tr>
          ) 
        }
        </tbody>
      </table>
  </>
}
