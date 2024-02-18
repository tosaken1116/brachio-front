import useSWR from "swr";
import { FAQ } from "../../FaqQuestionList/hooks";
type IUseFaqQuestion = {
	text: string | undefined;
	isEmpty: boolean;
};
type Args = {
	pageTitle: FAQ["pageTitle"];
};

export const useFaqQuestion = ({ pageTitle }: Args): IUseFaqQuestion => {
	const domain = window.location.hostname.split(".")[0];
	const { data } = useSWR<string>(
		pageTitle,
		() =>
			fetch(`${import.meta.env.VITE_BACKEND_URL}/${domain}/faq`, {
				method: "POST",
				body: JSON.stringify({ pageTitle }),
				headers: {
					"Access-Control-Allow-Origin": "*",
					Authorization: localStorage.getItem("temple-token") ?? "",
				},
			}).then((r) => {
				return r.text();
			}),
		{
			suspense: true,
		},
	);
	const isEmpty = data === "";
	return { text: data, isEmpty };
};
