import Head from 'next/head';
import styles from '../styles/hooter_css.module.css';

export default function Hooter() {
    return (
        <>
            <div className={styles.hooter}>
                <p><small>&copy; 2024 山岳部</small></p>
            </div>
        </>
    );
}
