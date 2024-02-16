import { sentry } from "@hono/sentry";
import { instrument } from "@microlabs/otel-cf-workers";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { renderer } from "./renderer";
import Auth from "./server/auth";
import { verify } from "./server/auth/utils";
import Balance from "./server/balance";
import Omikuji from "./server/omikuji";
import { config } from "./server/otel";

type Bindings = {
	SENTRY_DNS: string;
	KV: KVNamespace;
	DB: D1Database;
	JWT_SECRET: string;
};

type Variables = {
	userId: string;
};

const app = new Hono<{ Bindings: Bindings; Variables: Variables }>();

app.use("*", async (c, next) => {
	const sentryMiddleware = sentry({
		dsn: c.env.SENTRY_DNS,
		tracesSampleRate: 1.0,
	});
	return await sentryMiddleware(c, next);
});

app.use("/api/*", async (c, next) => {
	const token = c.req.header("Authorization");
	if (token === undefined) {
		throw new HTTPException(401, {
			message: "Authorization Header is required",
		});
	}
	try {
		const data: { id: string; exp: number } = await verify(
			token,
			c.env.JWT_SECRET,
		);
		console.log("data", data);
		c.set("userId", data.id);
		return next();
	} catch (error) {
		throw new HTTPException(401, { message: "Invalid Token" });
	}
});

app.get("*", renderer);

// Routing
app.route("/api/balance", Balance);
app.route("", Auth);
app.route("/api/omikuji", Omikuji);

app.get("/", async (c) => {
	return c.render(<h1>Hello!</h1>);
});

// export default instrument(app, config);
export default app;
