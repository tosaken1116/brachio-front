import { cx } from "hono/css";
import {
	buttonClass,
	contain,
	disabledContain,
	disabledOutline,
	disabledStyle,
	disabledText,
	outline,
	text,
} from "./index.styles";

type Props = {
	variant?: "outline" | "contain" | "text";
	type?: JSX.IntrinsicElements["button"]["type"];
} & JSX.IntrinsicElements["button"];

export const Button = ({
	class: className,
	type = "button",
	children,
	disabled = false,
	variant = "contain",
	...props
}: Props) => {
	return (
		<button
			{...props}
			class={cx(
				buttonClass,
				variant === "contain" && contain,
				variant === "outline" && outline,
				variant === "text" && text,
				disabled && disabledStyle,
				disabled && variant === "contain" && disabledContain,
				disabled && variant === "outline" && disabledOutline,
				disabled && variant === "text" && disabledText,
				className,
			)}
			type={type}
		>
			{children}
		</button>
	);
};
