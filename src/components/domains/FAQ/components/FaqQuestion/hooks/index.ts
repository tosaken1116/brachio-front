import useSWR from "swr";
import { FAQ } from "../../FaqQuestionList/hooks";
type IUseFaqQuestion = {
	text: string | undefined;
};
type Args = {
	pageTitle: FAQ["pageTitle"];
};
type Response = {
	descriptions: string[];
};
export const useFaqQuestion = ({ pageTitle }: Args): IUseFaqQuestion => {
	const domain = "hack-z";
	const { data } = useSWR<Response>(
		pageTitle,
		() =>
			fetch(`${import.meta.env.VITE_FAQ_BACKEND_URL}/${domain}/faq`, {
				method: "POST",
				body: JSON.stringify({ page_title: pageTitle }),
				headers: {
					"Access-Control-Allow-Origin": "*",
					Authorization: localStorage.getItem("temple-token") ?? "",
				},
			}).then((r) => {
				return r.json();
			}),
		{
			suspense: true,
		},
	);
	return {
		text: data?.descriptions
			.filter((desc) => !desc.startsWith("`?"))
			.join("\n"),
	};
};
