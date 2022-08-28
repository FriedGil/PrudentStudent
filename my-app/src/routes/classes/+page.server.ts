import { error } from '@sveltejs/kit';
import { prismaClient } from '$lib/prisma';
import type { PageServerLoad } from './$types';
import { MemberStatus } from '@prisma/client';

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
