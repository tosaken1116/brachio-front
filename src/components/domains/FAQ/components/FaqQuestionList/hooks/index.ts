import useSWR from "swr";

// import useSWR from "swr";
type IUseFaqQuestionList = {
	isEmpty: boolean;
	FAQs: FAQ[] | undefined;
	projectName: string;
};

export type FAQ = {
	question: string;
	pageTitle: string;
};
const fetcher = (url: string) => fetch(url).then((r) => r.json());

export const useFaqQuestionList = (): IUseFaqQuestionList => {
	const domain = "hack-z";

	const { data } = useSWR<FAQ[]>(
		domain,
		() => fetcher(`${import.meta.env.VITE_FAQ_BACKEND_URL}/${domain}/faq`),
		{ suspense: true },
	);
	const projectName = import.meta.env.VITE_SCRAPBOX_PROJECT_NAME;

	return { FAQs: data, isEmpty: data?.length === 0, projectName };
};
