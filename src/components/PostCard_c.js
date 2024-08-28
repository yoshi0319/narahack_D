import styles from '@/styles/postCard_css.module.css';
import { Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { useRouter } from "next/router";

// import { 
//     createtimePost_sort, 
//     viewPost_sort, 
//     randomPost_sort, 
//     trendPost_sort 
// } from "@/components/sort-functions"; // ソート関数をインポート


export default function PostCard({props, cate}) {
    const router = useRouter();
    const caten = cate;
    console.log(`Topページのカテゴリー:${caten}`);
    
    const [counter, setCounter] = useState(0);
    const [posts, setPosts] = useState(props || []);
    console.log(`テストです:${posts}`);

    const content = posts || []; // デフォルト値として空の配列を設定

    

    // useEffect(() => {
    //     if (props && Array.isArray(props)) {
    //         let sortedPosts = [...props];
    //         switch (select) {
    //             case '登録順':
    //                 sortedPosts = createtimePost_sort(sortedPosts);
    //                 break;
    //             case '閲覧数順':
    //                 sortedPosts = viewPost_sort(sortedPosts);
    //                 break;
    //             case 'ランダム':
    //                 sortedPosts = randomPost_sort(sortedPosts);
    //                 break;
    //             case '注目順':
    //                 sortedPosts = trendPost_sort(sortedPosts);
    //                 break;
    //         }
    //         setPosts(sortedPosts);
    //     }
    // }, [select]);

    const test = (id, caten) => {
        router.push(`/Tourist_Board_of_Nara/${caten}/Detail/${id}/`);
    }

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
                                <Button key={item.id} type="button" className={styles.column} onClick={() => test(item.id, caten)}>
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
