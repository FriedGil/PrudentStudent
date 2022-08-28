import { auth } from '$lib/lucia';
import { prismaClient } from '$lib/prisma';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ request }) => {
	try {
		const validation = await auth.validateRequestByCookie(request);

		const user = await prismaClient.user.findUnique({
			where: { id: validation.user.user_id },
			include: {
				classes: true
			}
		});

		return { success: true, user };
	} catch (e) {
		return { success: false, user: null };
	}
};
