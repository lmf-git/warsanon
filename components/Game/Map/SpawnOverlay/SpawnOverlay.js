import { useEffect, useState } from 'react';
import styles from '@components/Game/Map/SpawnOverlay/SpawnOverlay.module.css';

const spawns = [
    {
        name: "Spawn One"
    },
    {
        name: "Spawn Two"
    },
    {
        name: "Spawn Three"
    }
];

export default function SpawnOverlay({ setOverlay }) {
    const [spawnChoice, setSpawnChoice] = useState(null);

    const onSpawnChange = (ev) => {
        console.log(ev);
        console.log(ev.target.value);
        setSpawnChoice(ev.target.value);
        return false;
    }

    useEffect(() => {
        console.log('SpawnOverlay loaded');

        setTimeout(() => {
            // Close overlay after 3 seconds, basic test.
            // setOverlay(null);
        }, 3000);
    });
    return <div className={styles.overlay}>
        <h1 className={styles.title}>Select Home/Spawn</h1>
        <form className={styles.form}>
            <div className={styles.spawns}>
                { 
                    spawns.map((spawn, spawnIndex) => 
                        <div key={`spawn-choice-${spawnIndex}`} className={styles.spawn}>
                            <input 
                                className={styles.radio}
                                type="radio" name="spawn" 
                                onChange={onSpawnChange}
                                id={`spawn-choice-${spawnIndex}`}
                            />
                            <label 
                                className={styles.label}
                                htmlFor={`spawn-choice-${spawnIndex}`}>
                                { spawn.name }
                            </label>
                        </div>
                    )
                }
            </div>
            <button className={styles.confirm}>Spawn Here.</button>
        </form>
    </div>
}