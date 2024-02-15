import { sentry } from "@hono/sentry";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { renderer } from "./renderer";

type Bindings = {
	SENTRY_DSN: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.use("*", async (c, next) => {
	const sentryMiddleware = sentry({ dsn: c.env.SENTRY_DSN });
	return await sentryMiddleware(c, next);
});

app.get("*", renderer);

app.get("/", (c) => {
	return c.render(<h1>Hello!</h1>);
});

export default app;
