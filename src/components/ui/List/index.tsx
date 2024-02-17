import { cn } from "@/libs/cx";
import { ReactNode } from "react";

type Props = {
	children: ReactNode;
	column?: "row" | "col";
	className?: string;
};

export const List = ({ children, column = "col", className }: Props) => {
	return (
		<div
			className={cn(
				"flex",
				column === "row" && "flex-row",
				column === "col" && "flex-col",
				className,
			)}
		>
			{children}
		</div>
	);
};
