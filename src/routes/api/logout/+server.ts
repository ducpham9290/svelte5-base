import { auth } from '$lib/server/auth';
import { json } from '@sveltejs/kit';

export async function POST({ cookies, locals }) {
	if (!locals.session) {
		return json({ success: false, error: 'Not authenticated' }, { status: 401 });
	}

	// Invalidate session
	await auth.invalidateSession(locals.session.id);

	// Clear cookie
	const blankCookie = auth.createBlankSessionCookie();
	cookies.set(blankCookie.name, blankCookie.value, {
		...blankCookie.attributes,
		path: blankCookie.attributes.path ?? '/'
	});

	return json({ success: true });
}
