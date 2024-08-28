import dynamic from "next/dynamic";
import { get_posts } from "@/pages/api/getCategory_post";
import Footer from "@/components/Footer";
import styles from "@/styles/topPage_css.module.css";
import { useState } from 'react';


const TopHeader = dynamic(() => import('@/components/topHeader'),{ssr:false});
const PostCard = dynamic(() => import('@/components/PostCard_c'));

const conversionCategory = (category) => {
    switch (category) {
        case 'temples':
            return ('寺院');
        case 'shrines':
            return('神社');
        case 'restaurants':
            return ('飲食店');
        case 'souvenirs':
            return ('お土産');
        case 'museums':
            return ('資料館');
        case 'others':
            return ('その他');
    }
};

export async function getServerSideProps(context) {
    const { Category } = context.query;
    console.log(`英語カテゴリー:${Category}`);

    //データベースのカテゴリーに合うように日本語に変換
    const category = conversionCategory(Category);
    console.log(`カテゴリー: ${category}`);

    const response = await get_posts(category);

    console.log('いけたわよ');

    const posts = response;

    return {
        props: {
            posts,
            Category,
        },
    };
}

export default function Top (props) {
    const [filteredPosts, setFilteredPosts] = useState(props.posts); // 初期状態としてすべての投稿を設定

    const handleSearch = (searchTerm) => {
        const lowerCaseTerm = searchTerm.toLowerCase();
        const results = props.posts.filter(post => post.title.toLowerCase().includes(lowerCaseTerm));
        setFilteredPosts(results); // 検索結果を状態として設定
    };

    console.log(`厳選したやつ:${filteredPosts}`);
    return(
        <>
            <div className={styles.topHeader}>
                <TopHeader onSearch={handleSearch}/>
            </div>
            <div className={styles.postCard}>
                <PostCard searchprop={filteredPosts} props={props.posts} cate={props.Category}/>
            </div>
            <Footer />
        </>
    );
}