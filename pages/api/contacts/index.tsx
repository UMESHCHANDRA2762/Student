// pages/api/contacts.js
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req:NextApiRequest , res:NextApiResponse) {
  if (req.method === 'POST') {
    const { type,number, studentId } = req.body;
    const newContact = await prisma.contactNumber.create({
      data: {
        type,
        number,
        studentId,
      },
    });
    res.status(201).json(newContact);
  } else if (req.method === 'PUT') {
    const { id, number } = req.body;
    const updatedContact = await prisma.contactNumber.update({
      where: { id },
      data: { number },
    });
    res.status(200).json(updatedContact);
  } else if (req.method === 'DELETE') {
    const { id } = req.body;
    await prisma.contactNumber.delete({
      where: { id },
    });
    res.status(204).end();
  } else {
    res.setHeader('Allow', ['POST', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
