import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

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

    //このコードで送られたデータにいろんな情報を付与(今回使うのはfilepath)
    form.parse(req, async function (err, fields, files) {
        if (err) {
            return res.status(500).json({ method: req.method, error: err });
        }

        const title = fields.title[0];
        const category = fields.category[0];
        const explanation = fields.explanation[0];
        const place = fields.place[0];

        //配列なら一番最初のものを、単体ならそのまま入れる
        const mainImage_post = files.mainImage_post ? (Array.isArray(files.mainImage_post) ? files.mainImage_post[0] : files.mainImage_post) : null;
        const sub1Image_post = files.sub1Image_post ? (Array.isArray(files.sub1Image_post) ? files.sub1Image_post[0] : files.sub1Image_post) : null;
        const sub2Image_post = files.sub2Image_post ? (Array.isArray(files.sub2Image_post) ? files.sub2Image_post[0] : files.sub2Image_post) : null;

        console.log(mainImage_post);

        try {
            //filepathから画像データを抜き出す。そんで、バッファー型に変換←これはデータベースのbytea型に入れられるらしい
            const mainImageBuffer = mainImage_post ? fs.readFileSync(path.resolve(mainImage_post.filepath)) : null;
            const sub1ImageBuffer = sub1Image_post ? fs.readFileSync(path.resolve(sub1Image_post.filepath)) : null;
            const sub2ImageBuffer = sub2Image_post ? fs.readFileSync(path.resolve(sub2Image_post.filepath)) : null;
            
            console.log({title});
            console.log({category});
            console.log({explanation});
            console.log({place});

            console.log({mainImageBuffer});
            console.log({sub1ImageBuffer});
            console.log({sub2ImageBuffer});

            console.log('いくわよ');
            const post = await prisma.post.create({
                data: {
                    title: title,
                    category: category,
                    explanation: explanation,
                    place: place,

                    ...mainImage_post && { mainImage: mainImageBuffer },
                    ...sub1Image_post && { sub1Image: sub1ImageBuffer },
                    ...sub2Image_post && { sub2Image: sub2ImageBuffer },
                }
            })
            console.log('終わったわよ');
            return res.status(200).json({ message: 'データが正常に保存されました' });
        } catch (error) {
            console.error('Error:', error.message);
            res.status(500).json({ error: 'データベースに保存できなかった、Internal Server Error' });
            return; // 追加: 処理の終了を明示する
        }
    }); 
}