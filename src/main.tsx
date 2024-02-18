import {
	Link,
	Outlet,
	RouterProvider,
	createRootRoute,
	createRoute,
	createRouter,
} from "@tanstack/react-router";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { AllLive } from "./components/page/AllLive";
import { Auth } from "./components/page/Auth";
import { Live } from "./components/page/Live";
import { Root } from "./components/page/Root";
import { Setting } from "./components/page/Setting";
import { Button } from "./components/ui/button";
import "./global.css";
const rootRoute = createRootRoute({
	component: () => (
		<div>
			<header>
				<Link to={"/auth"}>
					<Button>認証</Button>
				</Link>
				<Link to={"/"}>
					<Button>FAQ</Button>
				</Link>
			</header>
			<Outlet />
		</div>
	),
});

const indexRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/",
	component: () => <Root />,
});

const allLiveRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/lives",
	component: () => <AllLive />,
});

const authRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/auth",
	component: () => <Auth />,
});

const liveRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/live/$id",
	component: () => <Live />,
});

const settingRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/setting",
	component: () => <Setting />,
});
const routeTree = rootRoute.addChildren([
	indexRoute,
	allLiveRoute,
	liveRoute,
	settingRoute,
	authRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

// biome-ignore lint/style/noNonNullAssertion: <explanation>
const rootElement = document.getElementById("app")!;
if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<StrictMode>
			<RouterProvider router={router} />
		</StrictMode>,
	);
}
