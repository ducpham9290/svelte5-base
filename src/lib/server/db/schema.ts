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

// Bảng keys (Lucia v3 yêu cầu)
export const keys = pgTable('keys', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.references(() => users.id, { onDelete: 'cascade' })
		.notNull(),
	hashedPassword: text('hashed_password')
});

// Bảng todos
export const todo = pgTable('todos', {
	id: text('id').primaryKey(),
	title: text('title').notNull(),
	completed: text('completed').notNull().default('false'),
	userId: text('user_id')
		.references(() => users.id, { onDelete: 'cascade' })
		.notNull(),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at').defaultNow()
});
