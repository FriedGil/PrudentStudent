import lucia from 'lucia-sveltekit';
import prisma from '@lucia-sveltekit/adapter-prisma';
import { dev } from '$app/env';
import { prismaClient } from '$lib/prisma';

export const auth = lucia({
	adapter: prisma(prismaClient),
	secret: import.meta.env.VITE_SECRET as string,
	env: dev ? 'DEV' : 'PROD'
});
