import { auth } from '$lib/server/auth';
import { json } from '@sveltejs/kit';
import { Argon2id } from 'oslo/password'; // hashing lib
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { generateId } from 'lucia';

export async function POST({ request, cookies }) {
	const { username, email, password } = await request.json();

	// Kiểm tra trùng username/email
	const exists = await db.select().from(users).where(eq(users.username, username));
	if (exists.length > 0) {
		return json({ success: false, error: 'Username already exists' }, { status: 400 });
	}

	// Hash mật khẩu
	const hashedPassword = await new Argon2id().hash(password);

	// Insert user vào DB
	const [newUser] = await db
		.insert(users)
		.values({
			id: generateId(15),
			username,
			email,
			passwordHash: hashedPassword
		})
		.returning();

	// Tạo session
	const session = await auth.createSession(newUser.id, {});

	const sessionCookie = auth.createSessionCookie(session.id);
	cookies.set(sessionCookie.name, sessionCookie.value, {
		...sessionCookie.attributes,
		path: sessionCookie.attributes.path ?? '/'
	});

	return json({ success: true, user: { id: newUser.id, username, email } });
}
