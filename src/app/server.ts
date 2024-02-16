import { showRoutes } from "hono/dev";
import { createApp } from "honox/server";

const app = createApp({
	root: "/src/app/routes",
	RENDERER: import.meta.glob("/src/app/routes/**/_renderer.tsx", {
		eager: true,
	}),
	ROUTES: import.meta.glob("/src/app/routes/**/[!_]*.(ts|tsx|mdx)", {
		eager: true,
	}),
});

showRoutes(app);

export default app;
