import dynamic from "next/dynamic";
import { get_posts } from "@/pages/api/getCategory_post";
import Footer from "@/components/Footer";
import styles from "@/styles/topPage_css.module.css";

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

    //データベースのカテゴリーに合うように日本語に変換
    const category = conversionCategory(Category);
    console.log(`カテゴリー: ${category}`);

    const response = await get_posts(category);

    console.log('いけたわよ');

    const posts = response;

    return {
        props: {
            posts,
        },
    };
}

export default function Top (props) {
    return(
        <>
            <div className={styles.topHeader}>
                <TopHeader />
            </div>
            <div className={styles.postCard}>
                <PostCard props={props.posts}/>
            </div>
            <Footer />
        </>
    );
}