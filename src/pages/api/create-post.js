import { PrismaClient } from '@prisma/client';

const formidable = require("formidable");

const prisma = new PrismaClient() 

export const config = {
    api: {
      bodyParser: false,
    },
  };

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(500).json({ error: 'POSTじゃないから受け付けないよ Internal Server Error' });
    }

    const form = new formidable.IncomingForm();

    form.parse(req, async function (err, fields, files) {
        if (err) {
            res.statusCode = 500;
            res.json({
                method: req.method,
                error: err
            })
            res.end();
            return;
        }

        const title = fields.title[0];
        const category = fields.category[0];
        const explanation = fields.explanation[0];
        const place = fields.place[0];

        console.log({title});
        console.log({category});
        console.log({explanation});
        console.log({place});

        try {
            const post = await prisma.post.create({
                data: {
                    title: title,
                    category: category,
                    explanation: explanation,
                    place: place,
                }
            })
        } catch (error) {
            res.status(500).json({ error: 'データベースに保存できなかった、Internal Server Error' });
        }

        res.statusCode = 200;
        res.json({
            method: req.method,
            error: 'できたよ'
        })
        res.end();
        return;
    })    
}
    //     try {
    //         const { title, category, explanation, place } = req.body;
    //         // console.log({ req });
    //         // Prisma を使用してデータを保存
    //         console.log({title});
    //         console.log(category);
    //         console.log(explanation);
    //         console.log(place);
    //         console.log("なんや？");
    //         const post = await prisma.post.create({
    //             data: {
    //                 title: title.title_name,
    //                 category: category.category_name,
    //                 explanation: explanation.category_name,
    //                 place: place.place_name,
    //             }
    //         });

    //         res.status(200).json(post);
    //     } catch (error) {
    //         res.status(500).json({ error: 'データベースに保存できなかった、Internal Server Error' });
    //     }
    // } else {
    //     res.setHeader('Allow', ['POST']);
    //     res.status(405).end(`なんかまず、tryすらさせてもらえなかったよ。Method ${req.method} Not Allowed`);
    // }



// 画像のバイナリデータを処理
            // .bufferで画像情報の中の画像データだけを取るようにする
            // const mainImage_post = req.body.mainImage_post ? req.body.mainImage_post[0].buffer : null;
            // const sub1Image_post = req.body.sub1Image_post ? req.body.sub1Image_post[0].buffer : null;
            // const sub2Image_post = req.body.sub2Image_post ? req.body.sub2Image_post[0].buffer : null;

            // main_image: mainImage_post,
            // sub1_image: sub1Image_post,
            // sub2_image: sub2Image_post