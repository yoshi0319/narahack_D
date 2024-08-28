// 登録順にソートする関数
export const createtime_sort = (sortPosts) => {
    const sortedPosts = [...sortPosts].sort((a, b) =>  a.id - b.id);
    return sortedPosts;
}

// 閲覧数順にソートする関数
export const viewPost_sort = (sortPosts) => {
    const sortedPosts = [...sortPosts].sort((a, b) => b.viewcount - a.viewcount);
    return sortedPosts;
};

// ランダムにソートする関数
export const randomPost_sort = (sortPosts) => {
    for (let i = sortPosts.length - 1; i > 0; i--) {
        // 0 から i までのランダムなインデックスを生成
        const j = Math.floor(Math.random() * (i + 1));
        // 配列の i 番目と j 番目の要素を交換
        [sortPosts[i], sortPosts[j]] = [sortPosts[j], sortPosts[i]];
    }
    return sortPosts;
};

// 注目順にソートする関数
export const trendPost_sort = (sortPosts) => {
    sortPosts = sortPosts.map(post => {
        const { viewcount, y_viewcount } = post;
        
        // 各投稿の増加数
        const increaseAmount = viewcount - y_viewcount;
        
        // 増加割合
        const growthRate = (y_viewcount > 0) ? (increaseAmount / y_viewcount) * 100 : 0;
        
        // スコアに増加割合を設定
        return { ...post, score: growthRate };
    }).sort((a, b) => b.score - a.score); // スコアが高い順にソート
    return sortPosts;
};
