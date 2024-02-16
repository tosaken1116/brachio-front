import { sentry } from "@hono/sentry";
import { instrument } from "@microlabs/otel-cf-workers";
import { Hono } from "hono";
import { renderer } from "./renderer";
import Auth from "./server/auth";
import Balance from "./server/balance";
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

// Routing
app.route("/balance", Balance);
app.route("", Auth);

app.get("/", async (c) => {
	return c.render(<h1>Hello!</h1>);
});

export default instrument(app, config);
