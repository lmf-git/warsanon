import styles from '@components/Game/Map/Tooltip/Tooltip.module.css';

export default function Tooltip({ position }) {
    return <div className={styles.tooltip}>
        { Math.round(position.x) } | { Math.round(position.y) }
    </div>
}