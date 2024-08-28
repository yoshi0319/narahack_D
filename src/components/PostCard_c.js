import styles from '@/styles/postCard_css.module.css';
import { Button } from '@mui/material';
import { useState, useEffect } from 'react';

// export default function PostCard(props) {
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

    // return(
export default function PostCard(props) {
    const [counter, setCounter] = useState(0);

    const content = props.props || []; // デフォルト値として空の配列を設定

    useEffect(() => {
        if (content.length > 0) {
            setCounter(content.length);
        }
    }, [content]);

    // アイテムを3つごとにグループ化する関数
    const chunkArray = (array, size) => {
        const result = [];
        for (let i = 0; i < array.length; i += size) {
            result.push(array.slice(i, i + size));
        }
        return result;
    };

    const groupedContent = chunkArray(content, 3);

    return (
        <>
        <div className={styles.article}>
            <div className={styles.container}>
                {groupedContent.length > 0 ? (
                    groupedContent.map((group, groupIndex) => (
                        <div key={groupIndex} className={styles.row}>
                            {group.map(item => (
                                <Button key={item.id} href="/Tourist_Board_of_Nara/Detail" className={styles.column}>
                                    <div className={styles.postCard}>
                                        <img src={item.mainImage} alt="参考画像" />
                                        <h2>{item.title}</h2>
                                        <hr />
                                        <p>{item.explanation}</p>
                                    </div>
                                </Button>
                            ))}
                        </div>
                    ))
                ) : (
                    <p>No content available</p> // コンテンツがない場合の表示
                )}
            </div>
            {/* <p>Counter: {counter}</p> 合計要素数を数えるために置いてます */}
            </div>
        </>
    );
}
