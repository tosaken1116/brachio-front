import { cn } from "@/libs/cx";
import { ReactNode, useEffect, useRef } from "react";
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
	const ref = useRef<HTMLDivElement>(null);
	useEffect(() => {
		if (ref.current) {
			ref.current.scrollIntoView({ behavior: "smooth" });
		}
	});
	return (
		<List className={className}>
			{chats.map((chat) => {
				return <Item align={alignPattern(chat)}>{render(chat)}</Item>;
			})}
			<div ref={ref} />
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
				align === "right" && "justify-end animate-slide-right",
				align === "left" && "justify-start animate-slide-left",
			)}
		>
			{children}
		</div>
	);
};
