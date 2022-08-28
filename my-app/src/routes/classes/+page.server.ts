import { error } from '@sveltejs/kit';
import { prismaClient } from '$lib/prisma';
import type { PageServerLoad } from './$types';
import { MemberStatus } from '@prisma/client';
import { auth } from '$lib/lucia';

export const load: PageServerLoad = async ({ request }) => {
	try {
		const validation = await auth.validateRequestByCookie(request);
		const id = validation.user.user_id as string;
		const classes = await prismaClient.class.findMany({
			where: {
				students: {
					some: {
						userId: id
					}
				}
			},
			select: {
				name: true,
				id: true,
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
		return { success: true, classes };
	} catch (e) {
		return { success: false, classes: null };
	}
};
