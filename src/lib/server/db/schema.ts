import { pgTable, text, varchar, timestamp } from 'drizzle-orm/pg-core';

// Bảng users
export const users = pgTable('users', {
	id: text('id').primaryKey(),
	username: varchar('username', { length: 50 }).notNull().unique(),
	email: varchar('email', { length: 100 }).notNull().unique(),
	passwordHash: text('password_hash').notNull(),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at').defaultNow()
});

// Bảng sessions (Lucia quản lý)
export const sessions = pgTable('sessions', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.references(() => users.id, { onDelete: 'cascade' })
		.notNull(),
	expiresAt: timestamp('expires_at').notNull()
});
