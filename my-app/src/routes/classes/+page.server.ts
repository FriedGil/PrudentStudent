import { error } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';

// /** @type {import('./$types').PageServerLoad} */
/* export async function load({ params }) {
    const post = await getPostFromDatabase(params.slug);

    if (post) {
        return post;
    }

    throw error(404, 'Not found');
} */