import { List } from "@/components/ui/List";
import { FaqQuestion } from "../../FaqQuestion";
import { FAQ } from "../hooks";

type Props = {
	FAQs: FAQ[];
	projectName: string;
};
export const FaqQuestionListPresentation = ({ FAQs }: Props) => (
	<List className="gap-8  p-4 flex-wrap" column="row">
		{FAQs.map((faq) => (
			<FaqQuestion pageTitle={faq.pageTitle} />
		))}
	</List>
);
