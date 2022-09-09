import * as PIXI from 'pixi.js';

import { setup } from "lib/map/controls";
import { useEffect } from "react";

import { Assets } from '@pixi/assets';

import styles from '@components/Map/Map.module.css';

export default function Map({ visibleRows }) {
    useEffect(() => {
        const view = document.querySelector('#map');
        if (window.safari !== undefined)
          PIXI.settings.PREFER_ENV = PIXI.ENV.WEBGL;

        const engine = new PIXI.Application({ view });

        // Import assets
        // Assets 

        const load = async () => {
            const texture = await Assets.load('/logo.png');
            const bunny = new PIXI.Sprite(texture);

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
        };
        load();

        setup();
    }, []);
    return <canvas id="map" className={styles.map} />
}
