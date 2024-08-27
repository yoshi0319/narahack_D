import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getDetail(id) {
    console.log(id);
    const id_id = 1;
    const post = await prisma.post.findUnique({
        where: { id: parseInt(id_id, 10) },
        select: {
            title: true,
            category: true,
            explanation: true,
            place: true,
            mainImage: true,
            sub1Image: true,
            sub2Image: true,
        },
    });
    if (post) {
        // Buffer を Base64 形式に変換
        post.mainImage = post.mainImage ? Buffer.from(post.mainImage).toString('base64') : null;
        post.sub1Image = post.sub1Image ? Buffer.from(post.sub1Image).toString('base64') : null;
        post.sub2Image = post.sub2Image ? Buffer.from(post.sub2Image).toString('base64') : null;
    }
    
    console.log('やったわよ');
    return post;
}