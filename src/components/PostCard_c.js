import styles from '@/styles/postCard_css.module.css';
import { Button, InputLabel, MenuItem, Select } from '@mui/material';
import { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import {FormControl} from "@mui/material";

import {
    createtime_sort,
    viewPost_sort, 
    randomPost_sort, 
    trendPost_sort 
} from "@/components/sort-functions"; // ソート関数をインポート


export default function PostCard({searchprops, props, cate}) {
    const router = useRouter();
    const caten = cate;
    console.log(`Topページのカテゴリー:${caten}`);

    console.log('--------------------------');
    const filertpost = searchprops || [];
    console.log(`厳選したやつだよFiltered Posts:${filertpost}`);
    console.log('All Props:', props);
    console.log('Category:', cate);
    console.log('-------------');

    const createtime = 'createtime';
    const view = 'view';
    const random = 'random';
    const trend = 'trend';

    useEffect(() => {
        setPosts(searchprops || props || []);
    }, [searchprops, props]);

    const [posts, setPosts] = useState(searchprops || props || []);
    const [order, setOrder] = useState({
        order_name: 'random'
    });
    const handleOrder = e => {
        setOrder({
            ...order,
            [e.target.name]: e.target.value
        });
        console.log(`${order}ほんにゃ〜`);
    };
    const show = () => {
        console.log(order);
    };

    const [counter, setCounter] = useState(0);
    // console.log(`テストです:${posts}`);
    posts.forEach(post => {
        console.log(`ID: ${post.id}, ViewCount: ${post.viewcount}`);
    });

    useEffect(() => {
        console.log('orderが変わりました。');
        if (posts && Array.isArray(posts)) {
            let sortedPosts = [...posts];
            switch (order.order_name) {
                case 'createtime':
                    console.log('登録順');
                    sortedPosts = createtime_sort(sortedPosts);
                    break;
                case 'view':
                    console.log('閲覧数順');
                    sortedPosts = viewPost_sort(sortedPosts);
                    break;
                case 'random':
                    console.log('ランダム');
                    sortedPosts = randomPost_sort(sortedPosts);
                    break;
                case 'trend':
                    console.log('トレンド');
                    sortedPosts = trendPost_sort(sortedPosts);
                    break;
            }
            setPosts(sortedPosts);
        }
    }, [order]);

    const test = (id, caten) => {
        router.push(`/Tourist_Board_of_Nara/${caten}/Detail/${id}/`);
    }
    useEffect(() => {
        if (posts.length > 0) {
            setCounter(posts.length);
        }
    }, [posts]);
    // アイテムを3つごとにグループ化する関数
    const chunkArray = (array, size) => {
        const result = [];
        for (let i = 0; i < array.length; i += size) {
            result.push(array.slice(i, i + size));
        }
        return result;
    };
    const groupedContent = chunkArray(posts, 3);

    return (
        <>
        <div className={styles.orderSelectContainer}>
            <div className={styles.topCategory}>
                <h2>・カテゴリー</h2>
            </div>
            <div>
                <FormControl
                    className={styles.orderButton}
                    sx={{ m: 1, minWidth: 150, width: 150 }}>
                    <InputLabel id="order">表示順</InputLabel>
                    <Select
                        id="order_name"
                        name="order_name"
                        value={order.order_name}
                        label="カテゴリー"
                        onChange={handleOrder}
                        onClick={show}>
                            <MenuItem value={createtime}>登録順</MenuItem>
                            <MenuItem value={view}>閲覧数順</MenuItem>
                            <MenuItem value={random}>ランダム</MenuItem>
                            <MenuItem value={trend}>注目順</MenuItem>
                        </Select>
                    </FormControl>
            </div>
        </div>

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
