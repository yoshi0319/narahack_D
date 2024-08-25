import { PrismaClient } from '@prisma/client';

let prisma;
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'POSTじゃないわよ!Method not allowed' });
    }

    const { code } = req.body;

    if (!code) {
        return res.status(400).json({ error: 'Code is required' });
    }

    try {
        // データベースからコードを検索
        const user = await prisma.user.findUnique({
            where: { code: code }
        });

        console.log(user);

        if (user) {
            // コードが一致するユーザーが見つかった場合
            return res.status(200).json({ message: 'User authenticated successfully' });
        } else {
            // コードが一致するユーザーが見つからなかった場合
            return res.status(401).json({ error: 'Authentication failed' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}