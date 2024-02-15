import { cx } from "hono/css";
import { baseStyle } from "./index.style";

type Props = {} & JSX.IntrinsicElements["textarea"];

export const TextArea = ({ ...props }: Props) => {
	return <textarea class={cx(baseStyle, props.class)} {...props} />;
};
