import styles from '@/styles/postCard_css.module.css';
import { Button } from '@mui/material';
import Link from 'next/link';

export default function PostCard(props) {
    // console.log("みょーん");
    // console.log(posts);
    // console.log(first.title);

    // const [posts, setPosts] = useState(props.props)

    // const sortCards = (type, posts) => {
    //     switch (type) {
    //         case '登録順':
    //             posts = createtimePost_sort(posts);
    //             break;
    //         case '閲覧数順':
    //             posts = viewPost_sort(posts);
    //             break;
    //         case 'ランダム':
    //             posts = randamPost_sort(posts);
    //             break;
    //         case '注目順':
    //             posts = trendPost_sort(posts);
    //             break;
    // }

    return(
        <>
            <div className={styles.container}>
                <Button href="/Tourist_Board_of_Nara/Detail">
                    <div className={styles.postCard}>
                        <img src = "/tokuyuji.jpg" alt = "参考画像" />
                        <h2>タイトル</h2>
                        <hr></hr>
                        <p>説明説ああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ
                            ああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ
                            ああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ
                            あああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ
                            ああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ
                            ああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ
                            あああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ
                            あああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ
                            ああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ
                            ああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ
                            ああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ
                            ああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ
                        </p>
                    </div>
                </Button>
                <Button href="/Tourist_Board_of_Nara/Detail">
                    <div className={styles.postCard}>
                        <img src = "/tokuyuji.jpg" alt = "参考画像" />
                        <h2>タイトル</h2>
                        <hr></hr>
                        <p>説明説ああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ</p>
                    </div>
                </Button>
                <Button href="/Tourist_Board_of_Nara/Detail">
                    <div className={styles.postCard}>
                        <img src = "/tokuyuji.jpg" alt = "参考画像" />
                        <h2>タイトル</h2>
                        <hr></hr>
                        <p>説明説ああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ</p>
                    </div>
                </Button>
            </div>
            <div className={styles.container}>
                <Button href="/Tourist_Board_of_Nara/Detail">
                    <div className={styles.postCard}>
                        <img src = "/tokuyuji.jpg" alt = "参考画像" />
                        <h2>タイトル</h2>
                        <hr></hr>
                        <p>説明説ああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ</p>
                    </div>
                </Button>
                <Button href="/Tourist_Board_of_Nara/Detail">
                    <div className={styles.postCard}>
                        <img src = "/tokuyuji.jpg" alt = "参考画像" />
                        <h2>タイトル</h2>
                        <hr></hr>
                        <p>説明説ああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ</p>
                    </div>
                </Button>
                <Button href="/Tourist_Board_of_Nara/Detail">
                    <div className={styles.postCard}>
                        <img src = "/tokuyuji.jpg" alt = "参考画像" />
                        <h2>タイトル</h2>
                        <hr></hr>
                        <p>説明説ああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ</p>
                    </div>
                </Button>
            </div>
            <div className={styles.container}>
                <Button href="/Tourist_Board_of_Nara/Detail">
                    <div className={styles.postCard}>
                        <img src = "/tokuyuji.jpg" alt = "参考画像" />
                        <h2>タイトル</h2>
                        <hr></hr>
                        <p>説明説ああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ</p>
                    </div>
                </Button>
                <Button href="/Tourist_Board_of_Nara/Detail">
                    <div className={styles.postCard}>
                        <img src = "/tokuyuji.jpg" alt = "参考画像" />
                        <h2>タイトル</h2>
                        <hr></hr>
                        <p>説明説ああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ</p>
                    </div>
                </Button>
                <Button href="/Tourist_Board_of_Nara/Detail">
                    <div className={styles.postCard}>
                        <img src = "/tokuyuji.jpg" alt = "参考画像" />
                        <h2>タイトル</h2>
                        <hr></hr>
                        <p>説明説ああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ</p>
                    </div>
                </Button>
            </div>
            <div className={styles.container}>
                <Button href="/Tourist_Board_of_Nara/Detail">
                    <div className={styles.postCard}>
                        <img src = "/tokuyuji.jpg" alt = "参考画像" />
                        <h2>タイトル</h2>
                        <hr></hr>
                        <p>説明説ああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ</p>
                    </div>
                </Button>
                <Button href="/Tourist_Board_of_Nara/Detail">
                    <div className={styles.postCard}>
                        <img src = "/tokuyuji.jpg" alt = "参考画像" />
                        <h2>タイトル</h2>
                        <hr></hr>
                        <p>説明説ああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ</p>
                    </div>
                </Button>
                <Button href="/Tourist_Board_of_Nara/Detail">
                    <div className={styles.postCard}>
                        <img src = "/tokuyuji.jpg" alt = "参考画像" />
                        <h2>タイトル</h2>
                        <hr></hr>
                        <p>説明説ああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ</p>
                    </div>
                </Button>
            </div>
        </>
    );
}