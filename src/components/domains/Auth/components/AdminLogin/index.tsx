import { ErrorBoundary } from "react-error-boundary";
import { AdminLoginContainer } from "./container";
import { AdminLoginErrorPresentation } from "./presentations/error";

export const AdminLogin = () => (
	<ErrorBoundary fallback={<AdminLoginErrorPresentation />}>
		<AdminLoginContainer />
	</ErrorBoundary>
);
