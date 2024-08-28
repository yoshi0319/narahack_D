import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // ダイナミックパラメータを決定
    const category = 'temple'; // ここでカテゴリを動的に決定します
    router.push(`/Tourist_Board_of_Nara/${category}`);
  }, []);

  return null; // このページ自体にはコンテンツはありません
}
