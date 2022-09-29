import { useEffect } from "react";

import MapConfig from 'lib/map/mapConfig';
import MapManager from 'lib/map/mapManager';
import NoiseHandler from "lib/map/noiseHandler";
import { controlsListen } from "lib/map/controls";

import styles from '@components/Game/Map/MapGUI.module.css';

export default function MapGUI({ setOverlay, chunks, position }) {

    useEffect(() => {
        // TODO: Get this from game server.
        MapConfig.seed = 2384832974;
        NoiseHandler.initialise();

        // Bootstrap game.
        MapManager.bootstrap(setOverlay);

        // Load the 8 chunks around the chunk.
        MapManager.populateScreenChunks();

        // Start listening for controller input.
        controlsListen();
    }, []);

    return <div id="map" className={styles['map-wrapper']}>
        <div id="viewport" className={styles['map-viewport']}>
            { chunks.map((chunk, cI) => 
                // TODO: Make into real class css module rule
                <div 
                    style={{
                        top: `calc(${position.y} * 100%)`,
                        left: `calc(${position.x} * 100%)`,
                    }} 
                    className={styles.chunk} key={`chunk-${cI}`}>
                    { chunk.tiles.map((tile, tI) => 
                        // TODO: Make into real class css module rule
                        <div className={styles.tile} key={`chunk-${tI}`}>
                            {tile.x}|{tile.y}
                        </div>
                    )}
                </div>
            ) }
        </div>
    </div>
}
