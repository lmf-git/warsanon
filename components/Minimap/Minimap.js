import * as PIXI from 'pixi.js';
import { useEffect } from 'react';

// import { setup } from "lib/map/controls";

import styles from './Minimap.module.css';


export default function Minimap({ visibleRows }) {
    useEffect(() => {
        const view = document.querySelector('#minimap');
        const engine = new PIXI.Application({ view });

        // load the texture we need
        engine.loader.add('bunnyTwo', 'logo.png').load((loader, resources) => {
            // This creates a texture from a 'bunny.png' image
            const bunny = new PIXI.Sprite(resources.bunnyTwo.texture);

            // Setup the position of the bunny
            bunny.x = engine.renderer.width / 2;
            bunny.y = engine.renderer.height / 2;

            // Rotate around the center
            bunny.anchor.x = 0.5;
            bunny.anchor.y = 0.5;

            // Add the bunny to the scene we are building
            engine.stage.addChild(bunny);

            // Listen for frame updates
            engine.ticker.add(() => {
                // each frame we spin the bunny around a bit
                bunny.rotation += 0.01;
            });
        });
    })
    return <canvas id="minimap" className={styles.minimap} /> ;
}
