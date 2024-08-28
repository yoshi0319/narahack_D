import PostCard from "@/components/PostCard_c";
import TopHeader from "../../components/topHeader";
import Footer from "@/components/Footer";
import styles from "@/styles/topPage_css.module.css";

export default function Top() {
    return (
        <>
            <div className={styles.topHeader}>
                <TopHeader />
            </div>
            <div className={styles.postCard}>
                <PostCard />
            </div>
            <Footer />
        </>
    );
}