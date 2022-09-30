import { useEffect } from "react";

import MapConfig from 'lib/map/mapConfig';
import MapManager from 'lib/map/mapManager';
import NoiseHandler from "lib/map/noiseHandler";
import { controlsListen, controlsUnlisten } from "lib/map/controls";

import styles from '@components/Game/Map/MapGUI.module.css';

export default function MapGUI({ setOverlay, chunks, position }) {

    useEffect(() => {
        // TODO: Get this from game server.
        MapConfig.seed = 2384832974;
        NoiseHandler.initialise();

        // Bootstrap game.
        MapManager.bootstrap(setOverlay);

        // Attach controls.
        controlsListen();

        // Detach and cleanup.
        return function cleanup() {
            // controlsUnlisten

            // Remove resize handler.
            window.removeEventListener('resize', MapManager.resize);
        }
    }, []);

    return <div id="map" className={styles['map-wrapper']}>
        <div id="viewport" className={styles['map-viewport']}
            style={{
                top: `calc(${position.y} * 100%)`,
                left: `calc(${position.x} * 100%)`,
            }}>
            { chunks.map((chunk, cI) => 
                // TODO: Make into real class css module rule
                <div 
                    className={styles.chunk} key={`chunk-${cI}`}
                    style={MapManager.calcChunkScreenPos(chunk)}>

                    {/* <span>X: {chunk.x} | Y: {chunk.y}</span> */}

                    { chunk.tiles.map((tile, tI) => 
                        // TODO: Make into real class css module rule
                        <div style={{ background: tile.biome }} className={styles.tile} key={`chunk-${tI}`}>
                            {tile.y}|{tile.x}
                        </div>
                    )}
                </div>
            ) }
        </div>
    </div>
}
