import { PrismaClient } from '@prisma/client';

let prisma;
if (!global.prisma) {
    global.prisma = new PrismaClient();
}
prisma = global.prisma;

export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { code } = req.body;
  
      if (!code) {
        return res.status(400).json({ error: 'Code is required' });
      }
  
      try {
        const newUser = await prisma.user.create({
          data: { code },
        });
        return res.status(201).json(newUser);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error creating user' });
      }
    } else {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  }