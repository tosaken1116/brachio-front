import { ChatContainer } from "@/components/ui/ChatContainer";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
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
	<div className="flex flex-col p-4 bg-gray-500 w-1/3 h-1/2 min-w-96 rounded-lg gap-4">
		{isEmpty ? (
			<FAQFormEmptyPresentation />
		) : (
			<div>
				<ChatContainer
					className="gap-4 max-h-1/2 overflow-y-auto"
					chats={chats}
					alignPattern={(item: TalkType) =>
						item.talker === "user" ? "right" : "left"
					}
					render={(item: TalkType) => (
						<span className="flex flex-row items-center gap-4">
							{item.talker === "bot" && (
								<Avatar className="rounded-full">
									<AvatarImage src="/bot.webp" />
								</Avatar>
							)}
							<p className=" rounded-full bg-green-400 text-black py-2 px-4">
								{item.message}
							</p>
							{item.talker === "user" && (
								<Avatar className="rounded-full">
									<AvatarImage src="/user.webp" />
								</Avatar>
							)}
						</span>
					)}
				/>
				{isLoading && <FAQFormLoadingPresentation />}
			</div>
		)}
		<form
			onSubmit={(e) => {
				e.preventDefault();
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
			<Button>送信</Button>
		</form>
	</div>
);
