import { FaqQuestionProps } from ".";
import { useFaqQuestion } from "./hooks";
import { FaqQuestionPresentation } from "./presentations";
export const FaqQuestionContainer = ({ pageTitle }: FaqQuestionProps) => {
	const { text } = useFaqQuestion({
		pageTitle: pageTitle,
	});
	return <FaqQuestionPresentation text={text ?? ""} pageTitle={pageTitle} />;
};
