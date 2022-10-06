import { useEffect, useState } from 'react';
import { getDatabase, ref, child, get } from "firebase/database";
import WorldManager from 'lib/worldManager';

import styles from '@components/Game/Map/SpawnOverlay/SpawnOverlay.module.css';
import MapManager from 'lib/map/mapManager';

export default function SpawnOverlay({ setOverlay, setPosition }) {
    const [spawnChoice, setSpawnChoice] = useState(null);
    const [spawns, setSpawns] = useState([]);

    const onSpawnChange = (ev, spawn) => {
        // Calculate the target chunk.
        const chunk = {
            x: Math.round(spawn.x / MapManager.chunkSize), 
            y: Math.round(spawn.y / MapManager.chunkSize)
        };

        // Load the target chunk before moving there.
        MapManager.addChunk(chunk.x, chunk.y);

        // Update camera position.
        setTimeout(() => setPosition({ x: spawn.x, y: spawn.y }), 0);

        // Load the peripheral chunks.
        // NOTE: Could show on the UI some tabs highlighting what's going on N/W/E/S directions.

        setSpawnChoice(spawn);

        return false;
    }

    const spawn = (ev) => {
        ev.preventDefault();

        // console.log(ev);
        // console.log(ev.target.value);
        // alert('Camera should move to spawn pos');

        setOverlay(null);

        return false;
    }



    // TODO: Load the spawns
    useEffect(() => {
        const load = async () => {
            const world = WorldManager.get();
            const spawnsData = (await get(ref(getDatabase(), `spawns/${world}`))).val();
            const spawns = Object.keys(spawnsData).map(k => spawnsData[k]);
            setSpawns(spawns);

            console.log(world);
            console.log(spawns);
        };
        load();

        // setTimeout(() => {
            // Close overlay after 3 seconds, basic test.
            // setOverlay(null);
        // }, 3000);
    }, []);



    return <div className={styles.overlay}>
        <h1 className={styles.title}>Select Home/Spawn</h1>
        <form className={styles.form} onSubmit={spawn}>
            <div className={styles.spawns}>
                { 
                    spawns.map((spawn, spawnIndex) => 
                        <div key={`spawn-choice-${spawnIndex}`} className={styles.spawn}>
                            <input 
                                className={styles.radio}
                                type="radio" name="spawn" 
                                onChange={ev => onSpawnChange(ev, spawn)}
                                id={`spawn-choice-${spawnIndex}`}
                            />
                            <label 
                                className={styles.label}
                                htmlFor={`spawn-choice-${spawnIndex}`}>
                                { spawn.name }
                                &nbsp;
                                { spawn.x }|{ spawn.y }
                            </label>
                        </div>
                    )
                }
            </div>
            {
                spawnChoice ?
                    <button className={styles.confirm}>
                        Spawn At {spawnChoice.name}
                    </button>
                    :
                    null
            }
        </form>
    </div>
}