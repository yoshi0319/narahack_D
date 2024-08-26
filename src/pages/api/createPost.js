import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// pages/api/createPost.js
export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  
    try {
      const { title, category, explanation, place } = req.body;
  
      // Example: Perform some server-side logic or database operations
      // Ensure all required fields are present
      if (!title || !category || !explanation || !place) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
  
      // Assume a database function to save the post
      const result = await savePostToDatabase({ title, category, explanation, place });
  
      // If successful
      return res.status(200).json({ message: 'Post created successfully', result });
    } catch (error) {
      console.error('Error creating post:', error);
      return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  }
  
