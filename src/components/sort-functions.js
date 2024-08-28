// 登録順にソートする関数
export const createtimePost_sort = (posts) => {
    return posts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
};

// 閲覧数順にソートする関数
export const viewPost_sort = (posts) => {
    return posts.sort((a, b) => b.views - a.views);
};

// ランダムにソートする関数
export const randomPost_sort = (posts) => {
    return posts.sort(() => Math.random() - 0.5);
};

// 注目順にソートする関数
export const trendPost_sort = (posts) => {
    return posts.sort((a, b) => b.trendScore - a.trendScore);
};
