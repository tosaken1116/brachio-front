import { ScrollPaper } from "@/components/ui/ScrollPaper";

type Props = {
	text: string;
	pageTitle: string;
};
export const FaqQuestionPresentation = ({ text, pageTitle }: Props) => (
	<ScrollPaper className="h-80" title={pageTitle}>
		<article>
			<p>{text}</p>
		</article>
	</ScrollPaper>
);
