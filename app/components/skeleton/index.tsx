import React from 'react'
import styles from './styles.module.css'

function Skeleton({ width, height }: { width?: string | number; height?: string | number }) {
    return (
        <div className={styles.skeleton} style={{ width, height }}></div>
    )
}

export default Skeleton