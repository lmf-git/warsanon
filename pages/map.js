import Head from 'next/head';

import { setup } from "lib/map/controls";
import { preload } from "lib/map/spriteHelper";
import { load_tiles } from "lib/map/visual";
import { useEffect, useState } from "react";

import mapStyles from '../styles/map.module.css';

export default function Map() {
  const [visibleRows, setVisibleRows] = useState([]);

  useEffect(() => {
    // Asynchronous loader, releasing to controls.
    const load = async () => {
      // TODO: Split drawing the tiles/grid when browser loads page from loading player data/tile specific data itself.
      // Draw tiles
      
      // Preload sprites.
      await preload();

      // Draw initial set of tiles.
      await load_tiles(setVisibleRows);

      // Attach controls for desktop, and resize initially.
      setup();
    };
    load();

    return function cleanup() {
      // Remove the event listeners
      // Remove the firebase listeners
    }
  });

  return <>
    <Head>
      <title>Warsanon | Map</title>
    </Head>

    <div id="map" className={mapStyles.map}>
      <table className={mapStyles.map}>
        <thead>

        </thead>
        <tbody>
        { 
          visibleRows.map((row, rowIndex) => 
            <tr key={`map-row-${rowIndex}`}>
              <td key={`map-row-help-${rowIndex}`}>i</td>
              {
                row.map((cell, cellIndex) => 
                  <td key={`map-row-${rowIndex}-cell-${cellIndex}`}>
                    {cell.x} | {cell.y}
                  </td>
                )
              }
            </tr>
          ) 
        }
        </tbody>
      </table>
    </div>
  </>
}
