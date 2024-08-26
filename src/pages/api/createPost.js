// import { PrismaClient } from '@prisma/client';

// let prisma;
// if (!global.prisma) {
//   global.prisma = new PrismaClient();
// }
// prisma = global.prisma;

// export default async function handler(req, res) {
//   if (req.method === 'POST') {
//     const { title, category, explanation, place } = req.body;

//     try {
//       const post = await prisma.post.create({
//         data: {
//           title,
//           category,
//           explanation,
//           place,
//         },
//       });

//       return res.status(201).json(post);
//     } catch (error) {
//       console.error('Error creating post:', error);
//       return res.status(500).json({ error: 'Failed to create post', details: error.message }); // エラーメッセージの詳細を追加
//     }
//   } else {
//     return res.status(405).json({ error: 'Method not allowed' });
//   }
// }
