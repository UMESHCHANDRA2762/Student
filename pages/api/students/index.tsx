// pages/api/students.js
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req :NextApiRequest, res :NextApiResponse) {
  if (req.method === 'GET') {
    const students = await prisma.student.findMany();
    return res.status(200).json(students);
  }

  if (req.method === 'POST') {
    try {
      const { name, city, number } = req.body;

      // Validate that required fields are provided
      if (!name || !city || !number) {
        return res.status(400).json({ error: "Name, city, and number are required." });
      }

      const newStudent = await prisma.student.create({
        data: {
          name,
          city,
          number,
        },
      });

      return res.status(201).json(newStudent);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "An error occurred while creating the student." });
    }
  }

  if (req.method === 'PUT') {
    const { id, name, city, number } = req.body;

    if (!id || !name || !city || !number) {
      return res.status(400).json({ error: "ID, name, city, and number are required." });
    }

    const updatedStudent = await prisma.student.update({
      where: { id: Number(id) },
      data: { name, city, number },
    });

    return res.status(200).json(updatedStudent);
  }

  if (req.method === 'DELETE') {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ error: "ID is required." });
    }

    await prisma.student.delete({
      where: { id: Number(id) },
    });

    return res.status(204).json({});
  }

  return res.status(405).json({ error: "Method not allowed." });
}
