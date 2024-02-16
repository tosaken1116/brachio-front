import { zValidator } from "@hono/zod-validator";
import { drizzle } from "drizzle-orm/d1";
import { Hono } from "hono";
import { createUser, getUser } from "./cruds";
import { CreateUserInput, LoginUserInput } from "./model";
import { sign } from "./utils";
import { checkPassword, hashPassword } from "./utils";

const app = new Hono();

app.post("/signup", zValidator("json", CreateUserInput), async (c) => {
	const req = c.req.valid("json");

	const db = drizzle(c.env.DB);

	const res = await createUser({
		user: {
			...req,
			password_hash: await hashPassword(req.password),
		},
		db,
	});
	if (res.error === null) {
		return c.json({ id: res.data }, res.status);
	}
	return c.json({ error: res.error }, res.status);
});

app.post("/signin", zValidator("json", LoginUserInput), async (c) => {
	const req = c.req.valid("json");
	const db = drizzle(c.env.DB);

	const res = await getUser({
		user: {
			...req,
			password: await hashPassword(req.password),
		},
		db,
	});
	if (res.error !== null || res.data === null) {
		return c.json({ data: null }, res.status);
	}
	if (!(await checkPassword(req.password, res.data.password_hash))) {
		return c.json({ error: "Invalid password" }, 400);
	}
	const token = await sign({ id: res.data.id }, c.env.JWT_SECRET);
	return c.json({ jwt: token, user: res.data }, res.status);
});

export default app;
