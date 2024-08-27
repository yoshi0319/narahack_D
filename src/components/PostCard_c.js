import styles from '@/styles/postCard_css.module.css';
import { Container } from '@mui/material';

export default function PostCard() {
    return(
        <>
            <div className={styles.container}>
                <div className={styles.postCard}>
                    <img src = "/tokuyuji.jpg" alt = "参考画像" />
                    <h2>タイトル</h2>
                    <hr></hr>
                    <p>説明説ああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ</p>
                </div>

                <div className={styles.postCard}>
                    <img src = "/tokuyuji.jpg" alt = "参考画像" />
                    <h2>タイトル</h2>
                    <hr></hr>
                    <p>説明説明説ああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ</p>
                </div>

                <div className={styles.postCard}>
                    <img src = "/tokuyuji.jpg" alt = "参考画像" />
                    <h2>タイトル</h2>
                    <hr></hr>
                    <p>説明説明説明ああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ</p>
                </div>
            </div>
        </>
    );
}