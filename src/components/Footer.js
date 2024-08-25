import Head from 'next/head';
import styles from '../styles/Footer_css.module.css';

export default function Footer() {
    return (
        <>
            <div className={styles.Footer}>
                <p><small>&copy; 2024 山岳部</small></p>
            </div>
        </>
    );
}
