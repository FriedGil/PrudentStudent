import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient;
}

export const prisma: PrismaClient =
    global.prisma ||
    new PrismaClient({
        log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    });

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;
