import { Request, Response } from 'express';
import { prisma } from '../prisma.js';

export const getRecords = async (req: Request, res: Response) => {
  try {
    const data = await prisma.testemony.findMany({
      select: {
        content: true,
        createdAt: true,
        user: {
          select: {
            firstname: true,
            lastname: true,
            image: true
          }
        }
      }
    });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch testemonies' });
  }
};

export const getRecord = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const data = await prisma.testemony.findUnique({
      where: { id: Number(id) },
      include: { 
        user: {
          select: {
            firstname: true,
            lastname: true,
            image: true
          }
        }
      }
    });
    if (!data) res.status(404).json({ error: 'Product not found' });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};