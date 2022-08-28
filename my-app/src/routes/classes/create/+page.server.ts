import type { Action } from './$types';
import { auth } from '$lib/lucia';
import { prismaClient } from '$lib/prisma';
import { MemberStatus } from '@prisma/client';
import { nanoid } from 'nanoid';

interface RequestObject {
	class_name: string;
	user_id: string;
}

export const POST: Action = async ({ request, setHeaders }) => {
	const json: RequestObject = await request.json();
	const class_name = json.class_name;
	const user_id = json.user_id;
	if (!class_name || typeof class_name !== 'string') {
		return {
			errors: {
				message: 'Invalid Input',
				username: ''
			}
		};
	}
	await prismaClient.class.create({
		data: {
			name: class_name,
			invite_id: nanoid(7),
			students: {
				create: [
					{
						userId: user_id,
						status: MemberStatus.TEACHER
					}
				]
			}
		}
	});

	// doesn't work but doesnt matter :D
	return {
		location: '/classes'
	};
};
