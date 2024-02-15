import { sentry } from "@hono/sentry";
import { Hono } from "hono";
import { renderer } from "./renderer";

const app = new Hono();

app.use("*", async (c, next) => {
	const sentryMiddleware = sentry({ dsn: c.env?.SENTRY_DSN as string });
	return await sentryMiddleware(c, next);
});

app.get("*", renderer);

app.get("/", (c) => {
	return c.render(<h1>Hello!</h1>);
});

export default app;
