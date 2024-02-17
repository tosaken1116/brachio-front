import { ChangeEvent, useState } from "react";

type IUseComment = {
	handleChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
	handleSubmit: () => Promise<void>;
	handleSlider: (e: number[]) => void;
	priceIndex: number;
	isSuper: boolean;
	changeToSuper: () => void;
	abortSuper: () => void;
	isCommentInput: boolean;
	comment: string;
};

export const useComment = (): IUseComment => {
	const [input, setInput] = useState("");
	const [priceIndex, setPriceIndex] = useState(0);
	const [isSuper, setIsSuper] = useState(false);
	const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setInput(e.target.value);
	};
	const handleSubmit = async () => {
		if (input.length === 0) {
			return;
		}
		await new Promise((resolve) => {
			setTimeout(() => {
				resolve(null);
				console.log(input);
			}, 1000);
		});
		setInput("");
	};
	const handleSlider = (e: number[]) => {
		setPriceIndex(e[0]);
	};
	const changeToSuper = () => {
		setIsSuper(true);
	};
	const abortSuper = () => {
		setIsSuper(false);
	};
	return {
		handleChange,
		handleSubmit,
		handleSlider,
		priceIndex,
		changeToSuper,
		abortSuper,
		isSuper,
		isCommentInput: input.length > 0,
		comment: input,
	};
};
