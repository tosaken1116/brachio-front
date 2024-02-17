import { ErrorBoundary } from "react-error-boundary";
import { FAQFormContainer } from "./container";
import { FAQFormErrorPresentation } from "./presentations/error";

export const FAQForm = () => (
	<ErrorBoundary fallback={<FAQFormErrorPresentation />}>
		<FAQFormContainer />
	</ErrorBoundary>
);
