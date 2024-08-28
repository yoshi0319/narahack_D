import { useEffect, useState } from 'react';
import styles from '@/styles/checkPost_css.module.css';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Button } from '@mui/material';
import Link from 'next/link';
import { router } from 'next/router';

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

    useEffect(() => {
        // postCategoryが更新されたときにカテゴリ変換関数を呼び出し
        conversionCategory(postCategory);
    }, [postCategory]);

    const conversionCategory = (category) => {
        switch (category) {
            case 'temples':
                setPostCategory('寺院');
                break;
            case 'shrines':
                setPostCategory('神社');
                break;
            case 'restaurants':
                setPostCategory('飲食店');
                break;
            case 'souvenirs':
                setPostCategory('お土産');
                break;
            case 'museums':
                setPostCategory('資料館');
                break;
            case 'others':
                setPostCategory('その他');
        }
    };

    const submitPost = () => {
        // // テキストデータと画像データをlocalStorageに保存
        // localStorage.setItem('postTitle', postTitle); // title_nameではなく、titleをそのまま保存
        // localStorage.setItem('postCategory', postCategory); // category_nameではなく、categoryをそのまま保存
        // localStorage.setItem('postExplanation', postExplanation); // explanation_nameではなく、explanationをそのまま保存
        // localStorage.setItem('postPlace', postPlace); // place_nameではなく、placeをそのまま保存
        // localStorage.setItem('mainImage', mainImage);
        // localStorage.setItem('subImage1', subImage1);
        // localStorage.setItem('subImage2', subImage2);
    
        // ページ遷移
        router.push("/Tourist_Board_of_Nara/CreatePost");
      };

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
                <div className={styles.imageWrapper}><img src={subImage2} alt="サブ画像２" /></div>
            </div>
            <div>
                <div className={styles.placeContainer}>
                    <LocationOnIcon />
                    <p>{postPlace}</p>
                </div>
                <div className={styles.buttonContainer}>
                    <div className={styles.backButton}>
                        <Button
                            onClick={submitPost}
                            // href = "/Tourist_Board_of_Nara/CreatePost"
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
                        <Link href="/Tourist_Board_of_Nara">
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
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
