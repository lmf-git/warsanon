// import { setup } from "lib/map/controls";
// import { useEffect } from "react";
import styles from './Minimap.module.css';

export default function Minimap({ visibleRows }) {
    return <canvas id="minimap" className={styles.minimap} /> ;
}