import { useState } from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function topHeader () {
    return (
        <>
            <div>
                <div className={styles.backButton}>
                        <ArrowBackIcon />
                        <a className={styles.backButtonLink}>戻る</a>
                </div>
                <div className={styles.topHeaderTitle}>
                    <h1>Tourist Board of Nara</h1>
                </div>
                <div>
                </div>
            </div>
        </>
    )
}