import { drizzle } from "drizzle-orm/better-sqlite3";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import { createUser, getUser } from "./cruds";
import { CreateUserInput, LoginUserInput } from "./model";
import { checkPassword, hashPassword } from "./utils";

export type AuthBinding = {
	Bindings: { DB: D1Database; JWT_SECRET: string };
};
const app = new Hono<AuthBinding>();

app.post("/signup", async (c) => {
	const parsed = CreateUserInput.safeParse(c.body);
	if (!parsed.success) {
		return c.json({ error: "Invalid input" }, 400);
	}
	const db = drizzle(c.env.DB);

	const res = await createUser({
		user: {
			...parsed.data,
			password_hash: await hashPassword(parsed.data.password),
		},
		db,
	});
	if (res.error === null) {
		return c.json({ data: null }, res.status);
	}
	return c.json({ error: res.error }, res.status);
});

app.post("/signin", async (c) => {
	const parsed = LoginUserInput.safeParse(c.body);
	if (!parsed.success) {
		return c.json({ error: "Invalid input" }, 400);
	}
	const db = drizzle(c.env.DB);

	const res = await getUser({
		user: {
			...parsed.data,
			password: await hashPassword(parsed.data.password),
		},
		db,
	});
	if (res.error !== null || res.data === null) {
		return c.json({ data: null }, res.status);
	}
	if (!(await checkPassword(parsed.data.password, res.data.password_hash))) {
		return c.json({ error: "Invalid password" }, 400);
	}
	const token = await sign({ id: res.data.id }, c.env.JWT_SECRET);
	return c.json({ jwt: token, data: res.data }, res.status);
});

export default app;
