import { ChatContainer } from "@/components/ui/ChatContainer";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/libs/cx";
import { ChangeEvent } from "react";
import { TalkType } from "../hooks";
import { FAQFormEmptyPresentation } from "./empty";
import { FAQFormLoadingPresentation } from "./loading";

type Props = {
	chats: TalkType[];
	chat: string;
	isEmpty: boolean;
	isLoading: boolean;
	handleChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
	handleTalkSubmit: () => void;
};

export const FAQFormPresentation = ({
	isEmpty,
	isLoading,
	chats,
	chat,
	handleChange,
	handleTalkSubmit,
}: Props) => (
	<div className="flex flex-col p-8 bg-gray-500 w-full h-1/2 min-w-96 min-h-48 rounded-lg gap-4">
		<div className="flex-grow gap-4 h-[500px] overflow-y-auto">
			{isEmpty ? (
				<FAQFormEmptyPresentation />
			) : (
				<ChatContainer
					className="gap-8"
					chats={chats}
					alignPattern={(item: TalkType) =>
						item.talker === "user" ? "right" : "left"
					}
					render={(item: TalkType) =>
						item.isBotLoading ? (
							<FAQFormLoadingPresentation />
						) : (
							<span
								className={cn(
									"flex flex-row items-center gap-4 break-all justify-end animate-slide-in",
								)}
							>
								{item.talker === "bot" && (
									<Avatar className="rounded-full">
										<AvatarImage src="/bot.webp" />
									</Avatar>
								)}
								<p className=" rounded-3xl bg-green-400 text-black py-2 px-4">
									{item.message}
								</p>
								{item.talker === "user" && (
									<Avatar className="rounded-full">
										<AvatarImage src="/user.webp" />
									</Avatar>
								)}
							</span>
						)
					}
				/>
			)}
		</div>
		<form
			onSubmit={(e) => {
				e.preventDefault();
				if (isLoading) {
					return;
				}
				handleTalkSubmit();
			}}
			onKeyDown={(e) => {
				if (e.ctrlKey && e.key === "Enter") {
					handleTalkSubmit();
				}
			}}
			className="flex flex-row items-center gap-4"
		>
			<Textarea value={chat} onChange={handleChange} />
			<Button disabled={isLoading}>送信</Button>
		</form>
	</div>
);
