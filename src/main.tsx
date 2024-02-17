import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { FAQForm } from "./components/domains/FAQ/components/FAQForm";
import { Auth } from "./components/page/Auth";
import { Payment } from "./components/page/Payment";
import { Root } from "./components/page/Root";
import "./global.css";
const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
	},
	{
		path: "/payment",
		element: <Payment />,
	},
	{
		path: "/faq",
		element: <FAQForm />,
	},
	{
		path: "/auth",
		element: <Auth />,
	},
]);
// biome-ignore lint/style/noNonNullAssertion: <explanation>
ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
);
