import { error } from '@sveltejs/kit';
import { prismaClient } from '$lib/prisma';
import type { PageServerLoad } from './$types';
import { MemberStatus } from '@prisma/client';

// /** @type {import('./$types').PageServerLoad} */
/* export async function load({ params }) {
    const post = await getPostFromDatabase(params.slug);

    if (post) {
        return post;
    }

    throw error(404, 'Not found');
} */

export const load: PageServerLoad = async () => {
    const classes = await prismaClient.class.findMany({
        select: {
            name: true,
            students: {
                where: {
                    status: MemberStatus.TEACHER
                },
                select: {
                    user: {
                        select: {
                            name: true
                        }
                    }
                }
            }
        }
    });
    return { success: true, classes }

}
