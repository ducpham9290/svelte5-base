import { auth } from '$lib/server/auth';
import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export async function POST({ request, cookies }) {
	const { username } = await request.json();

	try {
		// Tìm user theo username
		const existingUser = await db.select().from(users).where(eq(users.username, username)).limit(1);

		if (existingUser.length === 0) {
			throw new Error('Invalid credentials');
		}

		const user = existingUser[0];

		// TODO: Verify password hash here (cần implement password verification)

		// Tạo session mới
		const session = await auth.createSession(user.id, {});

		// Set cookie
		const sessionCookie = auth.createSessionCookie(session.id);
		cookies.set(sessionCookie.name, sessionCookie.value, {
			...sessionCookie.attributes,
			path: sessionCookie.attributes.path ?? '/'
		});

		return json({ success: true, session });
	} catch (err) {
		return json(
			{
				success: false,
				error: err instanceof Error ? err.message : 'Unknown error'
			},
			{ status: 400 }
		);
	}
}
