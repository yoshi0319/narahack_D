//import { useState } from "react";
import Head from 'next/head';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import styles from '../styles/login_header_css.module.css'; // スタイルのパスを適宜調整

export default function Header() {
    const router = useRouter();

    const handleGoBack = () => {
        router.push("/Tourist_Board_of_Nara"); // 前のページに戻る
    }

    return (
        <>
            <div className={styles.headerContainer}>
                <Button onClick={handleGoBack}>
                <div className={styles.backButton}>
                    <ArrowBackIcon />
                    <a className={styles.backButtonLink}>戻る</a>
                </div>
                </Button>
                <div className={styles.appTitle}>
                    <h1>Tourist Board of Nara</h1>
                </div>
            </div>
        </>
    );
}
