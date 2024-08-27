import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function get_posts(Category) {
    const posts = await prisma.post.findMany({
        where: { category: Category },
        select: {
            id: true,
            title: true,
            explanation: true,
            mainImage: true,
            create_post_time: true,
        },
        orderBy: {
            create_post_time: 'desc',
        },
    });

    const category_posts = posts.map(post => {
        return {
            ...post,
            create_post_time: post.create_post_time ? post.create_post_time.toISOString() : null,
            mainImage: post.mainImage ? `data:image/jpeg;base64,${Buffer.from(post.mainImage).toString('base64')}` : null,
            sub1Image: post.sub1Image ? `data:image/jpeg;base64,${Buffer.from(post.sub1Image).toString('base64')}` : null,
            sub2Image: post.sub2Image ? `data:image/jpeg;base64,${Buffer.from(post.sub2Image).toString('base64')}` : null,
        };
    });

    console.log('Posts:', category_posts);
    
    console.log('やったわよ');
    return category_posts;
}