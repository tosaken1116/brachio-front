import { FaqQuestionProps } from ".";
import { useFaqQuestion } from "./hooks";
import { FaqQuestionPresentation } from "./presentations";
import { FaqQuestionEmptyPresentation } from "./presentations/empty";
export const FaqQuestionContainer = ({ pageTitle }: FaqQuestionProps) => {
	const { text, isEmpty } = useFaqQuestion({
		pageTitle: pageTitle,
	});
	if (isEmpty || text === undefined) {
		return <FaqQuestionEmptyPresentation />;
	}
	return <FaqQuestionPresentation text={text} pageTitle={pageTitle} />;
};
