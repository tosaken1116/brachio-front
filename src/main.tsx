import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AllLive } from "./components/page/AllLive";
import { Auth } from "./components/page/Auth";
import { Live } from "./components/page/Live";
import { Root } from "./components/page/Root";
import { Setting } from "./components/page/Setting";
import "./global.css";
const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
	},
	{
		path: "/auth",
		element: <Auth />,
	},
	{
		path: "/live",
		element: <AllLive />,
	},
	{
		path: "/live:id",
		element: <Live />,
	},
	{
		path: "/setting",
		element: <Setting />,
	},
]);
// biome-ignore lint/style/noNonNullAssertion: <explanation>
ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
);
