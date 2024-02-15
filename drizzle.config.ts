import type { Config } from "drizzle-kit";

export default {
	schema: "./src/scripts/schema.ts",
	out: "./migrations",
	driver: "d1",
	dbCredentials: {
		wranglerConfigPath: "wrangler.toml",
		dbName: "my-next-app-db",
	},
} satisfies Config;
