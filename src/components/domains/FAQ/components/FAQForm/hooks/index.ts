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
};
export const useFAQForm = (): IUseFAQForm => {
	const [chat, setChat] = useState<string>("");
	const [chats, setChats] = useState<TalkType[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const isEmpty = chats.length === 0;
	const handleTalkSubmit = () => {
		if (chat.length === 0) {
			return;
		}
		setChats((prev) => {
			return [...prev, { talker: "user", message: chat }];
		});
		setChat("");
	};
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (chats.length === 0) {
			return;
		}
		if (chats[chats.length - 1].talker === "bot") {
			return;
		}
		(async () => {
			setIsLoading(true);
			const botTalk: TalkType = await (async () => {
				await new Promise((resolve) => setTimeout(resolve, 1000));
				return { talker: "bot", message: "I am a bot" };
			})();
			setIsLoading(false);
			setChats((prev) => {
				return [...prev, botTalk];
			});
		})();
	}, [chats]);
	const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setChat(e.target.value);
	};
	return { chat, chats, isLoading, isEmpty, handleChange, handleTalkSubmit };
};
