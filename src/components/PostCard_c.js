import styles from '@/styles/postCard_css.module.css';
import { Button } from '@mui/material';
import { useState, useEffect } from 'react';

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
            <div className={styles.container}>
                {groupedContent.length > 0 ? (
                    groupedContent.map((group, groupIndex) => (
                        <div key={groupIndex} className={styles.row}>
                            {group.map(item => (
                                <Button key={item.id} href="/Tourist_Board_of_Nara/Detail">
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
            <p>Counter: {counter}</p>
        </>
    );
}
