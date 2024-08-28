import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getDetail(id) {
    console.log(id);
    const post = await prisma.post.findUnique({
        where: { id: parseInt(id, 10) },
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
        post.mainImage = post.mainImage ? `data:image/jpeg;base64,${post.mainImage.toString('base64')}` : null;
        post.sub1Image = post.sub1Image ? `data:image/jpeg;base64,${post.sub1Image.toString('base64')}` : null;
        post.sub2Image = post.sub2Image ? `data:image/jpeg;base64,${post.sub2Image.toString('base64')}` : null;
    }

    console.log('データ取得できたわよ');

    await prisma.post.update({
        where: { id: parseInt(id, 10) },
        data: {
            viewcount: {
                increment: 1,
            },
        },
    });
    
    console.log('閲覧数１増やせたわよ');

    return post;
}

export default async function handler(req, res) {
  console.log("きたわよ！");
  if (req.method === "POST") {
    const { id } = req.body;
    console.log({ id });

    console.log("行きますよー、せ〜のっ！");
    try {
      const post = getDetail(id);

      console.log("あ〜〜〜、成功の音〜〜〜");

      console.log(post.title);
      console.log(post.category);
      console.log(post.explanation);
      console.log(post.place);
    //   console.log(post.mainImage);
    //   console.log(post.sub1Image);
    //   console.log(post.sub2Image);

      if (!post) {
        return res
          .status(404)
          .json({ error: "多分接続できていないよPost not found" });
      }

      res.status(200).json(post);
    } catch (error) {
      res
        .status(500)
        .json({ error: "値が見つけられなかったよInternal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}