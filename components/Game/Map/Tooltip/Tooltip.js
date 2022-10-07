import styles from '@components/Game/Map/Tooltip/Tooltip.module.css';
import MapManager from 'lib/map/mapManager';

export default function Tooltip({ position }) {
    // const { chunkSize } = MapManager;
    return <div className={styles.tooltip}>
        { Math.round(position.x) } | { Math.round(position.y) }
    </div>
}