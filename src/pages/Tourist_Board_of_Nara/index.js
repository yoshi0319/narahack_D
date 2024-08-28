import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // ダイナミックパラメータを決定
    const category = 'temples'; // ここでカテゴリを動的に決定します
    router.replace(`/Tourist_Board_of_Nara/${category}`);
  }, [router]);

  return null; // このページ自体にはコンテンツはありません
}
