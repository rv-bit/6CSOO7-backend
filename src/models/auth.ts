import { mysqlTable, varchar, text, int, timestamp, boolean } from 'drizzle-orm/mysql-core'
import type { InferSelectModel, InferInsertModel } from 'drizzle-orm'

export const user = mysqlTable('user', {
	id: varchar('id', { length: 36 }).primaryKey(),
	name: text('name').notNull(),
	email: varchar('email', { length: 255 }).notNull().unique(),
	emailVerified: boolean('emailVerified').notNull(),
	image: text('image'),
	createdAt: timestamp('createdAt').notNull(),
	updatedAt: timestamp('updatedAt').notNull(),
})

export const session = mysqlTable('session', {
	id: varchar('id', { length: 36 }).primaryKey(),
	expiresAt: timestamp('expiresAt').notNull(),
	token: varchar('token', { length: 255 }).notNull().unique(),
	createdAt: timestamp('createdAt').notNull(),
	updatedAt: timestamp('updatedAt').notNull(),
	ipAddress: text('ipAddress'),
	userAgent: text('userAgent'),
	userId: varchar('userId', { length: 36 })
		.notNull()
		.references(() => user.id),
})

export const account = mysqlTable('account', {
	id: varchar('id', { length: 36 }).primaryKey(),
	accountId: text('accountId').notNull(),
	providerId: text('providerId').notNull(),
	userId: varchar('userId', { length: 36 })
		.notNull()
		.references(() => user.id),
	accessToken: text('accessToken'),
	refreshToken: text('refreshToken'),
	idToken: text('idToken'),
	accessTokenExpiresAt: timestamp('accessTokenExpiresAt'),
	refreshTokenExpiresAt: timestamp('refreshTokenExpiresAt'),
	scope: text('scope'),
	password: text('password'),
	createdAt: timestamp('createdAt').notNull(),
	updatedAt: timestamp('updatedAt').notNull(),
})

export const verification = mysqlTable('verification', {
	id: varchar('id', { length: 36 }).primaryKey(),
	identifier: text('identifier').notNull(),
	value: text('value').notNull(),
	expiresAt: timestamp('expiresAt').notNull(),
	createdAt: timestamp('createdAt'),
	updatedAt: timestamp('updatedAt'),
})

type User = InferSelectModel<typeof user>
type Session = InferSelectModel<typeof session>
type Account = InferSelectModel<typeof account>
type Verification = InferSelectModel<typeof verification>

type InsertUser = InferInsertModel<typeof user>
type InsertSession = InferInsertModel<typeof session>
type InsertAccount = InferInsertModel<typeof account>
type InsertVerification = InferInsertModel<typeof verification>

export type { User, Session, Account, Verification }
export type { InsertUser, InsertSession, InsertAccount, InsertVerification }
