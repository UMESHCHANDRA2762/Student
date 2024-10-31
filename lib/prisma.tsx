// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

// Create a new instance of the PrismaClient
const prisma = new PrismaClient();

// Global variable to prevent creating multiple instances of Prisma Client
declare global {
  var prisma: PrismaClient | undefined;
}

// Ensure we only create a new instance in development
if (process.env.NODE_ENV === 'development') {
  if (!global.prisma) {
    global.prisma = prisma; // Assign the Prisma client to the global variable
  }
} else {
  prisma; // If not in development, just use the regular instance
}

export { prisma };
