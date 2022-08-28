import type { Action } from './$types';
import { prismaClient } from '$lib/prisma';
import { MemberStatus } from '@prisma/client';

interface RequestObject {
	invite: string;
	user_id: string;
}

export const POST: Action = async ({ request, setHeaders }) => {
	const json: RequestObject = await request.json();
	const inviteId = json.invite;
	const user_id = json.user_id;

	if (!inviteId || typeof inviteId !== 'string') {
		return {
			errors: {
				message: 'Invalid inpuit',
				username: ''
			}
		};
	}

	await prismaClient.class.update({
		where: {
			invite_id: inviteId
		},
		data: {
			students: {
				create: {
					userId: user_id as string,
					status: MemberStatus.STUDENT
				}
			}
		}
	});
};
