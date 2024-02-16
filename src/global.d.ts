import {} from "hono";
import { Bindings } from "hono/types";

declare module "hono" {
	interface Env {
		Bindings: {
			DB: D1Database;
			KV: KVNamespace;
			STRIPE_PUBLISHABLE_KEY: string;
			STRIPE_SECRET_KEY: string;
			STRIPE_WEBHOOK_SECRET: string;
			JWT_SECRET: string;
			SENTRY_DNS: string;
		};
		Variables: {
			userId: string;
		};
	}
	interface ContextRenderer {
		(content: string | Promise<string>, props?: { title?: string }): Response;
	}
}
