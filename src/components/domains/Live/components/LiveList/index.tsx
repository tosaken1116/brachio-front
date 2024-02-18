import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { LiveListContainer } from "./container";
import { LiveListErrorPresentation } from "./presentations/error";
import { LiveListLoadingPresentation } from "./presentations/loading";

export const LiveList = () => (
	<ErrorBoundary fallback={<LiveListErrorPresentation />}>
		<Suspense fallback={<LiveListLoadingPresentation />}>
			<LiveListContainer />
		</Suspense>
	</ErrorBoundary>
);
