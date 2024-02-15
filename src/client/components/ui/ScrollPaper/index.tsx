import { cx } from "hono/css";
import { CloseIcon } from "../../icon/close";
import {
	closeButton,
	container,
	openScroll,
	paper,
	scroll,
	stopper,
} from "./index.style";

type Props = {
	children: JSX.Element;
	class?: string;
	isOpen?: boolean;
	handleClose?: () => void;
};

const noop = () => {};
export const ScrollPaper = ({
	children,
	class: className,
	isOpen = true,
	handleClose = noop,
}: Props) => {
	return (
		<div class={cx(container, className)}>
			<div class={scroll} />
			<div class={cx(paper, isOpen && openScroll)}>
				<button onClick={handleClose} class={closeButton} type="button">
					<CloseIcon />
				</button>
				{children}
			</div>
			<div class={stopper} />
		</div>
	);
};
