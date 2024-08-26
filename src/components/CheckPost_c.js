// CheckPost.js
import { useEffect, useState } from 'react';
import styles from '@/styles/checkPost_css.module.css';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Button } from '@mui/material';

export default function CheckPost() {
    const [postTitle, setPostTitle] = useState('');
    const [postCategory, setPostCategory] = useState('');
    const [postExplanation, setPostExplanation] = useState('');
    const [postPlace, setPostPlace] = useState('');
    const [mainImage, setMainImage] = useState(null);
    const [subImage1, setSubImage1] = useState(null);
    const [subImage2, setSubImage2] = useState(null);

    useEffect(() => {
        // localStorageからデータを取得
        setPostTitle(localStorage.getItem('postTitle'));
        setPostCategory(localStorage.getItem('postCategory'));
        setPostExplanation(localStorage.getItem('postExplanation'));
        setPostPlace(localStorage.getItem('postPlace'));
        setMainImage(localStorage.getItem('mainImage'));
        setSubImage1(localStorage.getItem('subImage1'));
        setSubImage2(localStorage.getItem('subImage2'));
    }, []);

    return (
        <>
            <div className={styles.mainImage}>
                <img src={mainImage} alt="メイン画像" />
            </div>
            <div>
                <div className={styles.titleContainer}>
                    <div className={styles.title}>
                        <h1>{postTitle}</h1>
                    </div>
                    <div className={styles.category}>
                        <p>カテゴリ：{postCategory}</p>
                    </div>
                </div>
                <hr className={styles.line}></hr>
                <div className={styles.explanation}>
                    <p>{postExplanation}</p>
                </div>
            </div>
            <div className={styles.slideContainer}>
                <div className={styles.imageWrapper}><img src={subImage1} alt="サブ画像１" /></div>
                <div className={styles.imageWrapper}><img src={mainImage} alt="メイン画像" /></div>
                <div className={styles.imageWrapper}><img src={subImage2} alt="サブ画像１" /></div>
            </div>
            <div>
                <div className={styles.placeContainer}>
                    <LocationOnIcon />
                    <p>{postPlace}</p>
                </div>
                <div className={styles.buttonContainer}>
                    <div className={styles.backButton}>
                        <Button
                            variant="contained"
                            color="grey"
                            sx={{
                                backgroundColor: '#B0B0B0', 
                                color: '#000',
                                opacity: 0.9,
                                fontFamily: "'Klee One', sans-serif",
                                '&:hover': {
                                    backgroundColor: '#A0A0A0',
                                }
                            }}>
                            編集に戻る
                        </Button>
                    </div>
                    <div className={styles.createButton}>
                        <Button
                            variant="contained"
                            color="grey"
                            sx={{
                                backgroundColor: '#9CD8AB', 
                                color: '#000',
                                opacity: 0.9,
                                fontFamily: "'Klee One', sans-serif",
                                '&:hover': {
                                    backgroundColor: '#A0A0A0',
                                }
                            }}>
                            ページ作成
                        </Button>
                    </div>
                </div>
            </div>
        </>
        // <div>
        //     <h2>確認ページ</h2>
        //     <p>タイトル: {postTitle}</p>
        //     <p>カテゴリー: {postCategory}</p>
        //     <p>説明: {postExplanation}</p>
        //     <p>住所: {postPlace}</p>
        //     {mainImage && <img src={mainImage} alt="メイン画像" />}
        //     {subImage1 && <img src={subImage1} alt="サブ画像1" />}
        //     {subImage2 && <img src={subImage2} alt="サブ画像2" />}
        // </div>
    );
}
