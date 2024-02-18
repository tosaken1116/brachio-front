import { useFaqQuestionList } from "./hooks";
import { FaqQuestionListPresentation } from "./presentations";
import { FaqQuestionListEmptyPresentation } from "./presentations/empty";
export const FaqQuestionListContainer = () => {
	const { FAQs, isEmpty, projectName } = useFaqQuestionList();
	if (isEmpty || !FAQs) {
		return <FaqQuestionListEmptyPresentation />;
	}
	return <FaqQuestionListPresentation FAQs={FAQs} projectName={projectName} />;
};
