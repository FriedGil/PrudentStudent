import { auth } from '$lib/lucia';
import type { PageServerLoad } from './$types';
import { prismaClient } from '$lib/prisma';

export const load: PageServerLoad = async ({ request, url, params }) => {
	const validation = await auth.validateRequestByCookie(request);
	const id = validation.user.user_id as string;
    
    const course = await prismaClient.class.findFirst({
        where: {
            id: params.id,
            students: {
                some: {
                    userId: id
                }
            }
        }
    })

	return {
		course_data: course
	};
};