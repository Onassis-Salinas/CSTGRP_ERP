import { redirect } from '@sveltejs/kit';

export async function load({ request }) {
	const cookieHeader = request.headers.get('cookie') || '';

	const cookies = cookieHeader ? cookieHeader.split('; ') : [];
	const cookie = cookies.find((c) => c.startsWith('token='));

	const token = cookie ? cookie.split('=')[1] : null;
	if (!token) throw redirect(302, '/login');
}
