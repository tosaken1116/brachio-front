import { cn } from "@/libs/cx";
import { ReactNode } from "react";
import { List } from "../List";

type Props = {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	render: (item: any) => ReactNode;
	chats: unknown[];
	className?: string;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	alignPattern: (item: any) => "right" | "left";
};

export const ChatContainer = ({
	render,
	chats,
	className,
	alignPattern,
}: Props) => {
	return (
		<List className={className}>
			{chats.map((chat) => {
				return <Item align={alignPattern(chat)}>{render(chat)}</Item>;
			})}
		</List>
	);
};

const Item = ({
	children,
	align,
}: {
	children: ReactNode;
	align: "right" | "left";
}) => {
	return (
		<div
			className={cn(
				"flex",
				align === "right" && "self-end",
				align === "left" && "self-start",
			)}
		>
			{children}
		</div>
	);
};
