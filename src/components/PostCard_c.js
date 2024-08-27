import styles from '@/styles/postCard_css.module.css';
import { Container } from '@mui/material';
import Link from 'next/link';

export default function PostCard() {
    return(
        <>
            <div className={styles.container}>
                <Link href="/Tourist_Board_of_Nara/Detail">
                    <div className={styles.postCard}>
                        <img src = "/tokuyuji.jpg" alt = "参考画像" />
                        <h2>タイトル</h2>
                        <hr></hr>
                        <p>説明説ああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ</p>
                    </div>
                </Link>
                <Link href="/Tourist_Board_of_Nara/Detail">
                    <div className={styles.postCard}>
                        <img src = "/tokuyuji.jpg" alt = "参考画像" />
                        <h2>タイトル</h2>
                        <hr></hr>
                        <p>説明説明説ああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ</p>
                    </div>
                </Link>
                <Link href="/Tourist_Board_of_Nara/Detail">
                    <div className={styles.postCard}>
                        <img src = "/tokuyuji.jpg" alt = "参考画像" />
                        <h2>タイトル</h2>
                        <hr></hr>
                        <p>説明説明説明ああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ</p>
                    </div>
                </Link>
            </div>
        </>
    );
}