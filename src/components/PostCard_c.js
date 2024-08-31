import styles from '@/styles/postCard_css.module.css';
import { Button, InputLabel, MenuItem, Select } from '@mui/material';
import { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import { FormControl } from "@mui/material";

import {
    viewPost_sort, 
    randomPost_sort, 
    trendPost_sort 
} from "@/components/sort-functions"; // ソート関数をインポート

export default function PostCard({ props, cate }) {
    const router = useRouter();
    const { Category } = router.query;

    const categoryMapping = {
        temples: '寺社',
        shrines: '神社',
        restaurants: '飲食店',
        souvenirs: 'お土産',
        museums: '資料館',
        others: 'その他'
    };

    const translatedCategory = categoryMapping[Category] || Category; // 日本語のカテゴリー名に変換

    const caten = cate;
    console.log(`Topページのカテゴリー:${caten}`);

    const createtime = 'createtime';
    const view = 'view';
    const random = 'random';
    const trend = 'trend';

    const [posts, setPosts] = useState(props || []);
    const [order, setOrder] = useState({
        order_name: 'createtime'
    });
    
    useEffect(() => {
        const queryOrder = router.query.order; // URLのパラメータ 'order' を取得
        if (queryOrder) {
            setOrder({
                order_name: queryOrder
            });
        }
    }, [router.query.order]);

    //
    const handleOrder = e => {
        const newOrder = e.target.value;
        setOrder({
            ...order,
            order_name: newOrder
        });
    
    // URLパラメータを更新する
        router.push({
            pathname: router.pathname,
            query: { ...router.query, order: newOrder }
        }, undefined, { shallow: true });
    };

    
    const show = () => {
        console.log(order);
    };

    const [counter, setCounter] = useState(0);
    posts.forEach(post => {
        console.log(`ID: ${post.id}, ViewCount: ${post.viewcount}`);
    });

    useEffect(() => {
        console.log('orderが変わりました。');
        if (props && Array.isArray(props)) {
            let sortedPosts= [...props];
            switch (order.order_name) {
                case 'createtime':
                    console.log('登録順');
                    sortedPosts = props;
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
                    <h2>・{translatedCategory}一覧</h2> {/* 修正点: 日本語のカテゴリー名を表示 */}
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
                        <p>No content available</p> 
                    )}
                </div>
                {/* <p>Counter: {counter}</p> 合計要素数を数えるために置いてます */}
            </div>
        </>
    );
}
