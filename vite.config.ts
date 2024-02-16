import build from "@hono/vite-cloudflare-pages";
import pages from "@hono/vite-cloudflare-pages";
import devServer from "@hono/vite-dev-server";
import honox from "honox/vite";
import client from "honox/vite/client";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
	if (mode === "client") {
		return {
			plugins: [client()],
		};
	}
	return {
		plugins: [honox({ entry: "src/app/server.ts" }), pages()],
	};
});
