import { ChangeEvent, useEffect, useState } from "react";

type IUseFAQForm = {
	isEmpty: boolean;
	isLoading: boolean;
	chats: TalkType[];
	chat: string;
	handleTalkSubmit: () => void;
	handleChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};
export type TalkType = {
	talker: "user" | "bot";
	message: string;
	isBotLoading?: boolean;
};
export const useFAQForm = (): IUseFAQForm => {
	const domain = "hack-z";

	const [chat, setChat] = useState<string>("");
	const [chats, setChats] = useState<TalkType[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const isEmpty = chats.length === 0;
	const handleTalkSubmit = () => {
		if (chat.length === 0 || isLoading) {
			return;
		}
		setChats((prev) => {
			return [
				...prev,
				{ talker: "user", message: chat },
				{ talker: "bot", message: "", isBotLoading: true },
			];
		});
		setChat("");
	};
	const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setChat(e.target.value);
	};
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (chats.length === 0) {
			return;
		}

		if (
			chats[chats.length - 1].talker === "bot" &&
			!chats[chats.length - 1].isBotLoading
		) {
			return;
		}
		(async () => {
			setIsLoading(true);
			const botTalk: TalkType = await (async () => {
				try {
					const res = await fetch(
						`${import.meta.env.VITE_FAQ_BACKEND_URL}/${domain}/bedrock`,
						{
							method: "POST",
							body: JSON.stringify({
								prompt: chats[chats.length - 2].message,
							}),
							headers: {
								"Content-Type": "application/json",
							},
						},
					);
					const data = await res.json();
					return { talker: "bot", message: data.completion };
				} catch (e) {
					return { talker: "bot", message: "エラーが発生しました" };
				}
			})();
			setIsLoading(false);
			setChats((prev) => {
				return [...prev.slice(0, prev.length - 1), botTalk];
			});
		})();
	}, [chats]);

	return { chat, chats, isLoading, isEmpty, handleChange, handleTalkSubmit };
};
