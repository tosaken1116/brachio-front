import { drizzle } from "drizzle-orm/d1";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

type Bindings = {
	DB: D1Database;
};

const app = new Hono<{
	Bindings: Bindings;
}>();

app.post("/draw", (c) => {
	return c.json({ message: "draw" });
});

export default app;
