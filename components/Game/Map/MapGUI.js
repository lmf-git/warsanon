import { useEffect, useState } from "react";

import MapConfig from 'lib/map/mapConfig';
import MapManager from 'lib/map/mapManager';
import NoiseHandler from "lib/map/noiseHandler";
import { controlsListen, controlsUnlisten } from "lib/map/controls";

import styles from '@components/Game/Map/MapGUI.module.css';

export default function MapGUI({ setOverlay, chunks, position }) {
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    useEffect(() => {
        // TODO: Get this from game server.
        MapConfig.seed = 2384832974;
        NoiseHandler.initialise();

        // Bootstrap game.
        MapManager.bootstrap(setOverlay, setOffset);

        // Attach controls.
        controlsListen();

        // Detach and cleanup.
        return function cleanup() {
            // controlsUnlisten

            // Remove resize handler.
            window.removeEventListener('resize', MapManager.resize);
        }
    }, []);

    // Chunk loader based on position updates.
    useEffect(() => MapManager.chunking(), [position]);

    const tileOffsetPerc = 50 + (100 / MapManager.chunkSize) / 2;

    return <div id="map" className={styles['map-wrapper']}>

        <span className={styles['crosshair']}>X</span>

        <div id="viewport" className={styles['map-viewport']}
            style={{
                top: `calc((${position.y} * 100%) - ${tileOffsetPerc}%)`,
                left: `calc((${position.x} * 100%) - ${tileOffsetPerc}%)`,
            }}>
            { chunks.map((chunk, cI) => 
                // TODO: Make into real class css module rule
                <div 
                    className={styles.chunk} key={`chunk-${cI}`}
                    style={MapManager.calcChunkScreenPos(chunk)}>

                    { chunk.tiles.map((tile, tI) => 
                        // TODO: Make into real class css module rule
                        <div style={{ background: tile.biome }} className={styles.tile} key={`chunk-${tI}`}>
                            {tile.x}|{tile.y}
                        </div>
                    )}
                </div>
            ) }
        </div>
    </div>
}
