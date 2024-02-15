import { sentry } from "@hono/sentry";
import { instrument } from "@microlabs/otel-cf-workers";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { renderer } from "./renderer";
import { config } from "./server/otel";

type Bindings = {
	SENTRY_DNS: string;
	KV: KVNamespace;
	DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

app.use("*", async (c, next) => {
	const sentryMiddleware = sentry({
		dsn: c.env.SENTRY_DNS,
		tracesSampleRate: 1.0,
	});
	return await sentryMiddleware(c, next);
});

app.get("*", renderer);

app.get("/", async (c) => {
	return c.render(<h1>Hello!</h1>);
});

app.get("/items", async (c) => {
	const item = await c.env.KV.get("aa");
	return c.json({ success: true, aa: item });
});

app.post("/items", async (c) => {
	const { value } = await c.req.json();
	if (typeof value === "string") {
		await c.env.KV.put("aa", value);
	}
	return c.json({ success: true });
});

export default instrument(app, config);
