// pages/api/addresses.js
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req:NextApiRequest, res:NextApiResponse ) {
  if (req.method === 'POST') {
    const { street, city, state, country, studentId } = req.body;
    const newAddress = await prisma.address.create({
      data: {
        street,
        city,
        state,
        country,
        studentId,
      },
    });
    res.status(201).json(newAddress);
  } else if (req.method === 'PUT') {
    const { id, street, city, state, country } = req.body;
    const updatedAddress = await prisma.address.update({
      where: { id },
      data: {
        street,
        city,
        state,
        country,
      },
    });
    res.status(200).json(updatedAddress);
  } else if (req.method === 'DELETE') {
    const { id } = req.body;
    await prisma.address.delete({
      where: { id },
    });
    res.status(204).end();
  } else {
    res.setHeader('Allow', ['POST', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
