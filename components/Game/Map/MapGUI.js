import * as PIXI from 'pixi.js';

import { useEffect } from "react";

import MapConfig from 'lib/map/mapConfig';
import MapManager from 'lib/map/mapManager';
import NoiseHandler from "lib/map/noiseHandler";
import { controlsListen } from "lib/map/controls";

import styles from '@components/Game/Map/MapGUI.module.css';
//import { chunk } from 'underscore';

export default function MapGUI({ setOverlay }) {

    useEffect(() => {
        if (window.safari !== undefined)
            PIXI.settings.PREFER_ENV = PIXI.ENV.WEBGL;

        const view = MapConfig.mapElem= document.querySelector('#map');
        const container = MapConfig.containerElem = document.querySelector('#map-container');

        const engine = MapConfig.pixi = new PIXI.Application({ view });

        // Resize function window
        function resize() {
            view.width = container.offsetWidth;
            view.height = container.offsetHeight;

            const { clientWidth, clientHeight } = engine.view.parentNode;
            engine.renderer.resize(clientWidth, clientHeight);
        }

        // Listen for window resize events and trigger once to help initialise.
        window.addEventListener('resize', resize);
        setTimeout(() => resize(), 0);

        controlsListen();

        // Handle any pending/required render changes.
        MapConfig.pixi.ticker.add(() => MapManager.tick());

        // get this from game server
        MapConfig.seed = 2384832974;
        NoiseHandler.initialise();

        // Bootstrap game.
        MapManager.bootstrap(setOverlay);

        // Load the 8 chunks around the chunk
        MapManager.populateScreenChunks();
    }, []);

    return <canvas id="map" className={styles.map} />
}
