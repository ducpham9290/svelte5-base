import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { todo } from '$lib/server/db/schema';
import { and, desc, eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ locals }) => {
	const currentUser = locals.user;
	if (!currentUser) {
		throw redirect(302, '/demo/lucia/login');
	}

	const items = await db
		.select()
		.from(todo)
		.where(eq(todo.userId, currentUser.id))
		.orderBy(desc(todo.createdAt));

	return { items };
};

export const actions: Actions = {
	create: async ({ request, locals }) => {
		const currentUser = locals.user;
		if (!currentUser) return fail(401, { message: 'Unauthorized' });

		const form = await request.formData();
		const title = String(form.get('title') ?? '').trim();
		if (!title) return fail(400, { message: 'Title is required' });

		await db.insert(todo).values({ title, userId: currentUser.id });
		return { success: true };
	},

	update: async ({ request, locals }) => {
		const currentUser = locals.user;
		if (!currentUser) return fail(401, { message: 'Unauthorized' });

		const form = await request.formData();
		const id = String(form.get('id') ?? '');
		const title = String(form.get('title') ?? '').trim();
		if (!id || !title) return fail(400, { message: 'Invalid payload' });

		await db
			.update(todo)
			.set({ title, updatedAt: new Date() })
			.where(and(eq(todo.id, id), eq(todo.userId, currentUser.id)));
		return { success: true };
	},

	toggle: async ({ request, locals }) => {
		const currentUser = locals.user;
		if (!currentUser) return fail(401, { message: 'Unauthorized' });

		const form = await request.formData();
		const id = String(form.get('id') ?? '');
		const completed = form.get('completed') === 'on' || form.get('completed') === 'true';
		if (!id) return fail(400, { message: 'Invalid payload' });

		await db
			.update(todo)
			.set({ completed, updatedAt: new Date() })
			.where(and(eq(todo.id, id), eq(todo.userId, currentUser.id)));
		return { success: true };
	},

	delete: async ({ request, locals }) => {
		const currentUser = locals.user;
		if (!currentUser) return fail(401, { message: 'Unauthorized' });

		const form = await request.formData();
		const id = String(form.get('id') ?? '');
		if (!id) return fail(400, { message: 'Invalid payload' });

		await db.delete(todo).where(and(eq(todo.id, id), eq(todo.userId, currentUser.id)));
		return { success: true };
	}
};
