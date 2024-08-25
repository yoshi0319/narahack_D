import Head from 'next/head';
import styles from '../styles/footer_css.module.css'; // スタイルのパスを適宜調整

export default function Footer() {
    return (
        <>
            <div className={styles.hooter}>
                <p><small>&copy; 2024 山岳部</small></p>
            </div>
        </>
    );
}

