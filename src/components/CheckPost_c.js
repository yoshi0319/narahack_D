import { useEffect, useState } from 'react';
import styles from '@/styles/checkPost_css.module.css';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Button } from '@mui/material';

import Cookies from 'js-cookie';

export default function CheckPost() {
    const [postTitle, setPostTitle] = useState('');
    const [postCategory, setPostCategory] = useState('');
    const [postExplanation, setPostExplanation] = useState('');
    const [postPlace, setPostPlace] = useState('');
    const [mainImage, setMainImage] = useState(null);
    const [subImage1, setSubImage1] = useState(null);
    const [subImage2, setSubImage2] = useState(null);

    const Ok_create = async () => {
        try {
            const formData = new FormData();
    
            console.log({postTitle});
            console.log({postCategory});
            console.log({postExplanation});
            console.log({postPlace});

            console.log({mainImage});

            if (mainImage) {
                const imageBlob = await fetch(mainImage).then(r => r.blob());
                console.log('Image Blob:', imageBlob);
            }

            const userId = Cookies.get("userId");
            console.log("userId:", userId);
            
            // formData.append('link_User_id', '1');
            formData.append('title', postTitle);
            formData.append('category', postCategory);
            formData.append('explanation', postExplanation);
            formData.append('place', postPlace);
            formData.append('userId', userId);
    
            if (mainImage) formData.append('mainImage_post', await fetch(mainImage).then(r => r.blob()));
            if (subImage1) formData.append('sub1Image_post', await fetch(subImage1).then(r => r.blob()));
            if (subImage2) formData.append('sub2Image_post', await fetch(subImage2).then(r => r.blob()));
    
            for (let [key, value] of formData.entries()) {
                console.log(`${key}: ${value}`);
            }
            
            const response = await fetch('/api/create-post', {
                method: 'POST',
                body: formData,
            });
    
            const result = await response.json();
            console.log(result);
        } catch (error) {
            console.error('Error:', error);
        }
    };

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
                            onClick={Ok_create}
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
    );
}
