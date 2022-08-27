import { PrismaClient } from '@prisma/client';

declare global {
	var prismaClient: PrismaClient;
}

export const prismaClient: PrismaClient =
	global.prismaClient ||
	new PrismaClient({
		log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error']
	});
