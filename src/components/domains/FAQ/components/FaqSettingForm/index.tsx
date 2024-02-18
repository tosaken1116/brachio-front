import { ErrorBoundary } from "react-error-boundary";
import { FaqSettingFormContainer } from "./container";
import { FaqSettingFormErrorPresentation } from "./presentations/error";

export const FaqSettingForm = () => (
	<ErrorBoundary fallback={<FaqSettingFormErrorPresentation />}>
		<FaqSettingFormContainer />
	</ErrorBoundary>
);
