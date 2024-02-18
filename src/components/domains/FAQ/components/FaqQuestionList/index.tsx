import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { FaqQuestionListContainer } from "./container";
import { FaqQuestionListErrorPresentation } from "./presentations/error";
import { FaqQuestionListLoadingPresentation } from "./presentations/loading";

export const FaqQuestionList = () => (
	<ErrorBoundary fallback={<FaqQuestionListErrorPresentation />}>
		<Suspense fallback={<FaqQuestionListLoadingPresentation />}>
			<FaqQuestionListContainer />
		</Suspense>
	</ErrorBoundary>
);
