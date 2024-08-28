import styles from '@/styles/postCard_css.module.css';
import { Button } from '@mui/material';
import { useState, useEffect } from 'react';

export default function PostCard(props) {
    const [counter, setCounter] = useState(0);

    const content = props.props;

    useEffect(() => {
        if (content.length > 0) {
            setCounter(content.length);
        }
    }, [content]);

    return (
        <>
            <div className={styles.container}>
                {content.map(item => (
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
            <p>Counter: {counter}</p>
        </>
    );
}
