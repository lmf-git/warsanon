import * as PIXI from 'pixi.js';

import { useEffect } from "react";

import MapConfig from 'lib/map/mapConfig';
import NoiseHandler from "lib/noiseHandler";
import { controlsListen } from "lib/map/controls";

import styles from '@components/Game/Map/MapGUI.module.css';
import GameManager from 'lib/gameManager';
//import { chunk } from 'underscore';

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

        MapConfig.pixi.ticker.add(() => {
            for(chunk in GameManager.chunks){
                for (let i = 0; i < chunkSize; i++) {
                    for (let j = 0; j < chunkSize; j++) {
                        const scale = MapConfig.viewport.scale;
                        chunk.terrain[i * chunkSize + j].sprite.x = (MapConfig.viewport.position.x + chunk.terrain[i * chunkSize + j].x) * scale + MapConfig.mapElem.width / 2;
                        chunk.terrain[i * chunkSize + j].sprite.y = (MapConfig.viewport.position.y + chunk.terrain[i * chunkSize + j].y) * scale + MapConfig.mapElem.height / 2;
                        chunk.terrain[i * chunkSize + j].sprite.width = scale;
                        chunk.terrain[i * chunkSize + j].sprite.height = scale;
                    }
                }

                for (let i = 0; i < chunk.structures.length; i++) {
                    chunk.structures[i].sprite.x = (MapConfig.viewport.position.x + chunk.structures[i].x) * MapConfig.viewport.scale + MapConfig.mapElem.width / 2;
                    chunk.structures[i].sprite.y = (MapConfig.viewport.position.y + chunk.structures[i].y) * MapConfig.viewport.scale + MapConfig.mapElem.height / 2;
                    chunk.structures[i].sprite.width = MapConfig.viewport.scale;
                    chunk.structures[i].sprite.height = MapConfig.viewport.scale;
                }
            }
        });

        // get this from game server
        MapConfig.seed = 2384832974;
        NoiseHandler.initialise();

        // get this from game server
        // POSITION

        setTimeout(() => resize(), 0);

        // Load the 8 chunks around the chunk
        GameManager.loadChunk(0, 0);
        GameManager.loadChunk(1, 1);
        GameManager.loadChunk(-1, -1);
        GameManager.loadChunk(-1, 0);
        GameManager.loadChunk(1, 0);
        GameManager.loadChunk(1, -1);
        GameManager.loadChunk(0, -1);
    }, []);

    return <canvas id="map" className={styles.map} />
}
