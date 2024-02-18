import { cn } from "@/libs/cx";
import { CloseIcon } from "../../icon/close";
import styles from "./index.module.css";
type Props = {
	children: JSX.Element;
	className?: string;
	isOpen?: boolean;
	title?: string;
	handleClose?: () => void;
};

const noop = () => {};
export const ScrollPaper = ({
	children,
	className,
	title = "",
	isOpen = true,
	handleClose = noop,
}: Props) => {
	return (
		<div className={cn(styles.container, className)}>
			<div className={styles.scroll} />
			<div className={cn("absolute z-50", styles["text-top"])}>{title}</div>
			<div className={cn(styles.paper, isOpen && styles["open-scroll"])}>
				<button
					onClick={handleClose}
					className={styles["close-button"]}
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
