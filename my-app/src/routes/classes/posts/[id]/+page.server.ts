import { auth } from '$lib/lucia';
import type { PageServerLoad } from './$types';
import { prismaClient } from '$lib/prisma';

export const load: PageServerLoad = async ({ request, params }) => {
	const validation = await auth.validateRequestByCookie(request);
	const id = validation.user.user_id as string;
    console.log(params.id)

    const post = await prismaClient.post.findFirst({
        where: {
            id: params.id
        }
    })

    return {
        post: post,
        status: 200
    }
}