import styles from '@/styles/detail_css.module.css';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
import { useRouter } from "next/router";



export default function Detail( post ) {
    const router = useRouter();

    //ここ
    console.log('どう？');
    const data = post.post;
    console.log({ data });
    const { title, category, explanation, place, mainImage, sub1Image, sub2Image } = data;

    const mainImageSrc = mainImage;
    const sub1ImageSrc = sub1Image;
    const sub2ImageSrc = sub2Image;

    return (
        <>
            <div className={styles.mainImage}>
                <img src={mainImageSrc} alt="メイン画像" />
            </div>
            <div>
                <div className={styles.titleContainer}>
                    <div className={styles.title}>
                        <h1>{title}</h1>
                    </div>
                    <div className={styles.category}>
                        <p>カテゴリ:{category}</p>
                    </div>
                </div>
                <hr className={styles.line}></hr>
                <div className={styles.explanation}>
                    <p>{explanation}</p>
                </div>
            </div>
            <div className={styles.slideContainer}>
                <div className={styles.imageWrapper}><img src={sub1ImageSrc} alt="サブ画像１" /></div>
                <div className={styles.imageWrapper}><img src={mainImageSrc} alt="メイン画像" /></div>
                <div className={styles.imageWrapper}><img src={sub2ImageSrc} alt="サブ画像２" /></div>
            </div>
            <div>
                <div className={styles.placeContainer}>
                    <LocationOnIcon />
                    <p>住所：{place}</p>
                </div>
            </div>
            <div className={styles.parentContainer}>
                <Button type='button' className={styles.backButton} onClick={() => router.back()}>
                    <ArrowBackIcon />
                    Topへ戻る
                </Button>
            </div>        
        </>
    );
}
