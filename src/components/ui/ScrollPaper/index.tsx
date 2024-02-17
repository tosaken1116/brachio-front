import { cn } from "@/libs/cx";
import { cx } from "class-variance-authority";
import { CloseIcon } from "../../icon/close";
import styles from "./index.module.css";
type Props = {
	children: JSX.Element;
	className?: string;
	isOpen?: boolean;
	handleClose?: () => void;
};

const noop = () => {};
export const ScrollPaper = ({
	children,
	className,
	isOpen = true,
	handleClose = noop,
}: Props) => {
	return (
		<div className={cn(styles.container, className)}>
			<div className={styles.scroll} />
			<div className={cx(styles.paper, isOpen && styles.openScroll)}>
				<button
					onClick={handleClose}
					className={styles.closeButton}
					type="button"
				>
					<CloseIcon />
				</button>
				{children}
			</div>
			<div className={styles.stopper} />
		</div>
	);
};
