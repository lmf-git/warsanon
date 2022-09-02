import { setup } from "lib/map/controls";
import { preload } from "lib/map/spriteHelper";
import { draw_villages } from "lib/map/visual";
import { useEffect } from "react";

import mapStyles from '../styles/map.module.css';

export default function GameMap() {

  useEffect(() => {
    const canvas = document.querySelector("canvas");
    const context = canvas.getContext("2d");

    // Shared object for map.
    window.MAP = {
      canvas: canvas,
      context: context,

      chunks: new Map,

      // Viewport configuration and shared state.
      viewport: {
        zoom: 1,
        position: {
          x: 0,
          y: 0
        },
        clicked: false,
        squares_on_screen: 5
      }
    };

    // Preload sprites.
    preload();

    // Draw initial set of tiles.
    draw_villages();

    // Attach controls for desktop, and resize initially.
    setup();
  });

  return <div id="map" className={mapStyles.map}>
    <canvas className={mapStyles.map} />
  </div>
}
