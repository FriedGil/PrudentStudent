import { auth } from '$lib/lucia';
import type { Action } from './$types';

export const load = auth.load;

export const POST: Action = async ({ request, setHeaders }) => {
	const form = await request.formData();
	const email = form.get('email');
	const password = form.get('password');
	if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
		return {
			errors: {
				message: 'Invalid Input',
				username: ''
			}
		};
	}
	try {
		const createUser = await auth.createUser('email', email, {
			password,
			user_data: {
				email
			}
		});
		setHeaders({ 'set-cookie': createUser.cookies });
		return {
			location: '/login'
		};
	} catch (e) {
		const error = e as Error;
		if (
			error.message === 'AUTH_DUPLICATE_IDENTIFIER_TOKEN' ||
			error.message === 'AUTH_DUPLICATE_USER_DATA'
		) {
			return {
				errors: {
					username: 'Email is already used',
					message: ''
				}
			};
		}
		return {
			status: 500,
			errors: {
				message: 'Unknown error',
				username: ''
			}
		};
	}
};
