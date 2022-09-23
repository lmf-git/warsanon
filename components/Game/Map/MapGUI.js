import * as PIXI from 'pixi.js';

import { useEffect } from "react";

import MapConfig from 'lib/map/mapConfig';
import NoiseHandler from "lib/noiseHandler";
import { controlsListen } from "lib/map/controls";

import styles from '@components/Game/Map/MapGUI.module.css';
import GameManager from 'lib/gameManager';

export default function MapGUI() {

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

        // Listen for window resize events
        window.addEventListener('resize', resize);

        controlsListen();

        // get this from game server
        MapConfig.seed = 2384832974;
        NoiseHandler.initialise();

        // get this from game server
        // POSITION

        setTimeout(() => resize(), 0);

        GameManager.loadChunk(0, 0);
    }, []);

    return <canvas id="map" className={styles.map} />
}
