import { cn } from "@/libs/cx";
import styles from "./index.module.css";

type Props = {} & JSX.IntrinsicElements["textarea"];

export const TextArea = ({ className, ...props }: Props) => {
	return <textarea className={cn(styles.baseStyle, className)} {...props} />;
};
