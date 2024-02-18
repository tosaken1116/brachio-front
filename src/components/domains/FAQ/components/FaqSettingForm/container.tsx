import { useFaqSettingForm } from "./hooks";
import { FaqSettingFormPresentation } from "./presentations";
export const FaqSettingFormContainer = () => {
	const { handleChange, handleSubmit } = useFaqSettingForm();
	return (
		<FaqSettingFormPresentation
			handleChange={handleChange}
			handleSubmit={handleSubmit}
		/>
	);
};
