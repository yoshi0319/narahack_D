import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, password } = req.body;

        if (!name || !password) {
            return res.status(400).json({ error: 'Name and password are required' });
        }

        try {
            const user = await prisma.users.create({
                data: {
                    name,
                    password,
                },
            });
            return res.status(201).json(user);
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
