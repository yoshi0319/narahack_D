import styles from "@/styles/Home.module.css";
import Link from "next/link";

export default function ProductsList() {
    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h2 className={styles.title}>商品一覧</h2>
                <ul>
                    <li>
                        <Link href="/products/smartphone">
                            スマートフォン
                        </Link>
                    </li>
                </ul>
                <ul>
                    <li>
                        <Link href="/products/pc">
                            パソコン
                        </Link>
                    </li>
                </ul>
                <ul>
                    <li>
                        <Link href="/products/headphone">
                            ヘッドフォン
                        </Link>
                    </li>
                </ul>
            </main>
        </div>
    );
}

