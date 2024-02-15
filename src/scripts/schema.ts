import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
	id: text("id").primaryKey(),
	email: text("email").notNull().unique(),
	name: text("name").notNull(),
	password_hash: text("password_hash").notNull(),
	created_at: text("created_at").default("CURRENT_TIMESTAMP"),
	updated_at: text("updated_at").default("CURRENT_TIMESTAMP"),
});
