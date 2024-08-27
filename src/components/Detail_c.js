import styles from '@/styles/detail_css.module.css';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';

export default function Detail() {

    const mainImage = "/tokuyuji.jpg";
    const subImage1 = "/tokuyuji2.jpg";
    const subImage2 = "/tokuyuji3.jpg";
    const title = "タイトル";
    const category = "カテゴリ";
    const explanation = "大和北部八十八ヶ所霊場の第四番礼所。奈良時代、右大臣・藤原豊成の邸宅跡に位置し、豊成の娘として奈良に生まれた中将姫（ちゅうじょうひめ）の霊跡で、境内には2基の石塔（宝篋（きょう）印塔）があります。前身は元興寺の子院の1つで、室町時代に元興寺が土一揆で罹災したため本尊を現在地に移し、天正18年（1590年）融通念仏宗の寺院となりました。境内には中将姫が継母に折檻されたとされる「虚空塚」が残っています。また、観音堂には赤ん坊を胸の前に抱き上げた珍しい姿の子安観音像が安置されています。大和北部八十八ヶ所霊場の第四番礼所。奈良時代、右大臣・藤原豊成の邸宅跡に位置し、豊成の娘として奈良に生まれた中将姫（ちゅうじょうひめ）の霊跡で、境内には2基の石塔（宝篋（きょう）印塔）があります。前身は元興寺の子院の1つで、室町時代に元興寺が土一揆で罹災したため本尊を現在地に移し、天正18年（1590年）融通念仏宗の寺院となりました。境内には中将姫が継母に折檻されたとされる「虚空塚」が残っています。また、観音堂には赤ん坊を胸の前に抱き上げた珍しい姿の子安観音像が安置されています。"
    const address = "住所";

    return (
        <>
            <div className={styles.mainImage}>
                <img src={mainImage} alt="メイン画像" />
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
                <div className={styles.imageWrapper}><img src={subImage1} alt="サブ画像１" /></div>
                <div className={styles.imageWrapper}><img src={mainImage} alt="メイン画像" /></div>
                <div className={styles.imageWrapper}><img src={subImage2} alt="サブ画像２" /></div>
            </div>
            <div>
                <div className={styles.placeContainer}>
                    <LocationOnIcon />
                    <p>住所：{address}</p>
                </div>
            </div>
            <div className={styles.parentContainer}>
                <Button href="/Tourist_Board_of_Nara" className={styles.backButton} >
                    <ArrowBackIcon />
                    Topへ戻る
                </Button>
            </div>        
        </>
    );
}
