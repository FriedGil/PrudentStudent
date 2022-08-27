import type { Action } from './$types';

export const POST: Action = async ({ request, setHeaders }) => {
    const values = await request.formData();
    console.log(values)
    return {
        location: "/classes"
    }
}