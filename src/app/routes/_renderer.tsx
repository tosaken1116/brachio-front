import { Style } from "hono/css";
import { jsxRenderer } from "hono/jsx-renderer";
import { HasIslands, Script } from "honox/server";
import { globalClass } from "./global.css";

export default jsxRenderer(
	({ children, title }) => {
		return (
			<html lang="en">
				<head>
					<meta charset="utf-8" />
					<meta
						name="viewport"
						content="width=device-width, initial-scale=1.0"
					/>
					{import.meta.env.PROD ? (
						<HasIslands>
							<script type="module" src="/static/client.js" />
						</HasIslands>
					) : (
						<script type="module" src="/src/app/client.ts" />
					)}
					<title>{title}</title>
					<Script src="/src/app/client.ts" />
					<Style />
				</head>
				<body class={globalClass}>{children}</body>
			</html>
		);
	},
	{ stream: true },
);
