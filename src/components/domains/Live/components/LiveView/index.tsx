import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { LiveViewContainer } from "./container";
import { LiveViewErrorPresentation } from "./presentations/error";
import { LiveViewLoadingPresentation } from "./presentations/loading";

export const LiveView = () => {
	return (
		<ErrorBoundary fallback={<LiveViewErrorPresentation />}>
			<Suspense fallback={<LiveViewLoadingPresentation />}>
				<LiveViewContainer />
			</Suspense>
		</ErrorBoundary>
	);
};
