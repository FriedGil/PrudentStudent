import { prismaClient } from "$lib/prisma";
import { MemberStatus } from "@prisma/client";
import type { Action } from './$types';

export const POST: Action = async ({ request, setHeaders }) => {
    const form = await request.formData();
    const class_name = form.get("class_name");
	if (!class_name || typeof class_name !== 'string') {
		return {
			errors: {
				message: 'Invalid Input',
				username: ''
			}
		};
	}
    prismaClient.class.create({
        data: {
            name: class_name,
            students: {
                create: [
                    {
                        status: MemberStatus.TEACHER,
                    }
                ]
            }
        }
    })

    return {
        location: "/classes"
    }
}