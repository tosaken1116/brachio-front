import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { FaqQuestionContainer } from "./container";
import { FaqQuestionErrorPresentation } from "./presentations/error";
import { FaqQuestionLoadingPresentation } from "./presentations/loading";

export type FaqQuestionProps = {
	pageTitle: string;
};

export const FaqQuestion = ({ pageTitle }: FaqQuestionProps) => (
	<ErrorBoundary fallback={<FaqQuestionErrorPresentation />}>
		<Suspense fallback={<FaqQuestionLoadingPresentation />}>
			<FaqQuestionContainer pageTitle={pageTitle} />
		</Suspense>
	</ErrorBoundary>
);
