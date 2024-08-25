//import { useState } from "react";
import Head from 'next/head';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MenuIcon from '@mui/icons-material/Menu';
import styles from '../styles/header_css.module.css'; // スタイルのパスを適宜調整

export default function Header() {
    return (
        <>
            <div className={styles.headerContainer}>
                <div className={styles.backButton}>
                    <ArrowBackIcon />
                    <a className={styles.backButtonLink}>戻る</a>
                </div>
                <div className={styles.appTitle}>
                    <h1>Tourist Board of Nara</h1>
                </div>
                <div>
                    <MenuIcon fontSize="large"/>
                </div>
            </div>
        </>
    );
}