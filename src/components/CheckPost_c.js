// CheckPost.js
import { useEffect, useState } from 'react';

export default function CheckPost() {
    const [postTitle, setPostTitle] = useState('');
    const [postCategory, setPostCategory] = useState('');
    const [postExplanation, setPostExplanation] = useState('');
    const [postPlace, setPostPlace] = useState('');
    const [mainImage, setMainImage] = useState(null);
    const [subImage1, setSubImage1] = useState(null);
    const [subImage2, setSubImage2] = useState(null);

    useEffect(() => {
        // localStorageからデータを取得
        setPostTitle(localStorage.getItem('postTitle'));
        setPostCategory(localStorage.getItem('postCategory'));
        setPostExplanation(localStorage.getItem('postExplanation'));
        setPostPlace(localStorage.getItem('postPlace'));
        setMainImage(localStorage.getItem('mainImage'));
        setSubImage1(localStorage.getItem('subImage1'));
        setSubImage2(localStorage.getItem('subImage2'));
    }, []);

    return (
        <div>
            <h2>確認ページ</h2>
            <p>タイトル: {postTitle}</p>
            <p>カテゴリー: {postCategory}</p>
            <p>説明: {postExplanation}</p>
            <p>住所: {postPlace}</p>
            {mainImage && <img src={mainImage} alt="メイン画像" />}
            {subImage1 && <img src={subImage1} alt="サブ画像1" />}
            {subImage2 && <img src={subImage2} alt="サブ画像2" />}
        </div>
    );
}
