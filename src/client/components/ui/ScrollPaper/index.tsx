import { cx } from "hono/css";
import { container, paper, scroll, stopper } from "./index.style";

type Props = { children: JSX.Element; class?: string };

export const ScrollPaper = ({ children, class: className }: Props) => {
	return (
		<div class={cx(container, className)}>
			<div class={scroll} />
			<div class={paper}>{children}</div>
			<div class={stopper} />
		</div>
	);
};
