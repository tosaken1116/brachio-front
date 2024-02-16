import { Hono } from "hono";
import Omikuji from "../../server/omikuji";
type Bindings = {
	SENTRY_DNS: string;
	KV: KVNamespace;
	DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

// app.use("*", async (c, next) => {
//   const sentryMiddleware = sentry({
//     dsn: c.env.SENTRY_DNS,
//     tracesSampleRate: 1.0,
//   });
//   return await sentryMiddleware(c, next);
// });

// Routing
// app.route("/balance", Balance);
// app.route("", Auth);

app.route("/omikuji", Omikuji);

export default app;
