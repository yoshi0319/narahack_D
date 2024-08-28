import styles from '@/styles/postCard_css.module.css';
import { Button, InputLabel, MenuItem, Select } from '@mui/material';
import { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import {FormControl} from "@mui/material";

// export default function PostCard(props) {
    // console.log("みょーんんんんんんん!!!");
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

export default function PostCard({props, cate}) {
    const router = useRouter();
    const caten = cate;
    console.log(`Topページのカテゴリー:${caten}`);

    const createtime = 'createtime';
    const view = 'view';
    const random = 'random';
    const trend = 'trend';
    const [order, setOrder] = useState({
        order_name: 'createtime'
    });
    const handleOrder = e => {
        setOrder({
            ...order,
            [e.target.name]: e.target.value
        });
    };
    const show = () => {
        console.log(order);
    };

    const [counter, setCounter] = useState(0);
    const content = props || []; // デフォルト値として空の配列を設定
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
            <h1>この文章は削除しておいてください。</h1>
            {/* <p>Counter: {counter}</p> 合計要素数を数えるために置いてます */}
            </div>
        </>
    );
}
