import { ScrollPaper } from "@/components/ui/ScrollPaper";

type Props = {
	text: string;
	pageTitle: string;
};
export const FaqQuestionPresentation = ({ text }: Props) => (
	<ScrollPaper>
		<article>
			<p>{text}</p>
		</article>
	</ScrollPaper>
);
