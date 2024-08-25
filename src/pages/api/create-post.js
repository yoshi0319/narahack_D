const { PrismaClient } = require('@prisma/client') // Prismaクライアントをインポート

const prisma = new PrismaClient() 

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { title, category, explanation, place } = req.body;

            // 画像のバイナリデータを処理
            // .bufferで画像情報の中の画像データだけを取るようにする
            const mainImage_post = req.body.mainImage_post ? req.body.mainImage_post[0].buffer : null;
            const sub1Image_post = req.body.sub1Image_post ? req.body.sub1Image_post[0].buffer : null;
            const sub2Image_post = req.body.sub2Image_post ? req.body.sub2Image_post[0].buffer : null;

            // //デバックをこなう
            // console.log('link_User_id:', link_User_id);
            // console.log('title:', title);
            // console.log('category:', category);
            // console.log('explanation:', explanation);
            // console.log('place:', place);

            // console.log('mainImage_post size:', mainImage_post ? mainImage_post.length : 'No image');
            // console.log('sub1Image_post size:', sub1Image_post ? sub1Image_post.length : 'No image');
            // console.log('sub2Image_post size:', sub2Image_post ? sub2Image_post.length : 'No image');

            // Prisma を使用してデータを保存
            const post = await prisma.post.create({
                data: {
                    title: title,
                    categori: category,
                    explain: explanation,
                    address: place,
                    main_image: mainImage_post,
                    sub1_image: sub1Image_post,
                    sub2_image: sub2Image_post
                }
            });

            res.status(200).json(post);
        } catch (error) {
            res.status(500).json({ error: 'できてないよ!Internal Server Error' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}