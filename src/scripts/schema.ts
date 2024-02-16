import { relations, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
	id: text("id").primaryKey(),
	email: text("email").notNull().unique(),
	name: text("name").notNull(),
	password_hash: text("password_hash").notNull(),
	created_at: integer("created_at", { mode: "timestamp_ms" }).default(
		sql`CURRENT_TIMESTAMP`,
	),
	updated_at: integer("updated_at", { mode: "timestamp_ms" }).default(
		sql`CURRENT_TIMESTAMP`,
	),
});

export const userRelations = relations(users, ({ many }) => {
	return {
		balanceTransactions: many(balanceTransactions),
	};
});

export const omikuji = sqliteTable("omikuji", {
	id: text("id").primaryKey(),
	grade: text("grade").notNull(),
	probability: integer("probability").notNull(),
	created_at: integer("created_at", { mode: "timestamp_ms" }).default(
		sql`CURRENT_TIMESTAMP`,
	),
	updated_at: integer("updated_at", { mode: "timestamp_ms" }).default(
		sql`CURRENT_TIMESTAMP`,
	),
});

// 残高履歴テーブル
export const balanceTransactions = sqliteTable("balance_transaction", {
	id: text("id").primaryKey(),
	userId: text("user_id").notNull(),
	type: text("type", { enum: ["deposit", "withdraw"] }).notNull(),
	amount: integer("amount").notNull(),
	timestamp: integer("timestamp", { mode: "timestamp_ms" }).default(
		sql`CURRENT_TIMESTAMP`,
	),
});
