import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // クエリパラメータからカテゴリを取得
    const { category } = router.query;

    // デフォルトカテゴリを設定
    const defaultCategory = 'temples'; 
    const categoryToRedirect = category || defaultCategory;

    // カテゴリページへリダイレクト
    router.replace(`/Tourist_Board_of_Nara/${categoryToRedirect}`);
  }, [router.query]);

  return null; // このページ自体にはコンテンツはありません
}
