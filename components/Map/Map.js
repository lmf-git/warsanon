import { setup } from "lib/map/controls";
import { useEffect } from "react";

import styles from '@components/Map/Map.module.css';

export default function Map({ visibleRows }) {
    useEffect(() => setup(), []);
    return <canvas id="map" className={styles.map} />
}