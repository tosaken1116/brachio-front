import { useRefStore } from "@/store/useRefStore";
import { ChangeEvent, useState } from "react";
import { prices } from "../presentations";

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
	paying: boolean;
	paymentExit: () => void;
};

export const useComment = (): IUseComment => {
	const [input, setInput] = useState("");
	const [priceIndex, setPriceIndex] = useState(0);
	const [isSuper, setIsSuper] = useState(false);
	const [isPaying, setIsPaying] = useState(false);
	const socketRef = useRefStore((state) => state.socketRef);

	const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setInput(e.target.value);
	};
	const handleSubmit = async () => {
		if (input.length === 0) {
			return;
		}
		if (isSuper) {
			setIsPaying(true);
		}
		await new Promise((resolve) => {
			setTimeout(() => {
				resolve(null);
				console.log("sss");
			}, 1000);
		});
		socketRef?.current?.send(
			JSON.stringify({
				price: prices[priceIndex],
				comment: input,
			}),
		);
		setInput("");
		setIsSuper(false);
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
	const paymentExit = () => {
		setIsPaying(false);
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
		paying: isPaying,
		paymentExit,
	};
};
