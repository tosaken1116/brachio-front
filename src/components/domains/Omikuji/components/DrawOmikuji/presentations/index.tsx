import { cn } from "@/libs/cx";

type Props = {
	handleOmikuji: () => void;
	isLoaded: boolean;
	result: string;
};
export const DrawOmikujiPresentation = ({
	isLoaded,
	handleOmikuji,
	result,
}: Props) => {
	return (
		<button
			type="button"
			className="w-fit h-fit relative"
			onClick={() => {
				handleOmikuji();
			}}
		>
			{!isLoaded && (
				<div className=" absolute left-1/2 top-4 font-bold -translate-x-1/2 w-full">
					<div className="animate-bounce w-full">
						<p>おみくじを引く</p>
						<p>↓</p>
					</div>
				</div>
			)}
			<div
				className={cn(
					" w-fit fill-mode-forwards",
					isLoaded && "animate-spin-half",
				)}
			>
				<div
					className={cn(
						"w-32 delay-1000",
						isLoaded ? "animate-shake-large" : "animate-shake",
					)}
				>
					<OmikujiBox pop={isLoaded} result={result} />
				</div>
			</div>
		</button>
	);
};

export const OmikujiBox = ({
	pop,
	result,
}: {
	pop: boolean;
	result: string;
}) => {
	return (
		<div className="relative w-100px aspect-omikuji">
			<div
				className="w-1/4 absolute left-0 bottom-0 h-2/3 bg-orange-700"
				style={{
					boxShadow: "inset 5px 0px 10px 0px #000000aa",

					clipPath: "polygon(0px 0,100% 15%, 100% 100%, 0px 85%)",
				}}
			/>
			<div className="w-1/2 absolute bottom-0 left-1/4 z-30 clip-trapezoid h-[56.6666%] bg-orange-700" />
			<div
				className="w-1/4 absolute bottom-0 right-0 h-2/3 bg-orange-700"
				style={{
					clipPath: "polygon(0px 15%,100% 0px, 100% 85%, 0px 100%)",
					boxShadow: "inset -5px 0px 10px 0px #000000aa",
				}}
			/>
			<div className="absolute w-full top-[24%] h-[20%]">
				<div
					className="w-full relative h-1/2 bg-orange-700 z-10"
					style={{
						clipPath: "polygon(25% 0%, 75% 0%, 100% 100%, 0px 100%)",
					}}
				>
					<div className=" absolute right-1/2 translate-x-1/2 -bottom-0.5 z-20 aspect-[2/1] h-[30%] rounded-t-full bg-black" />
				</div>
				<div
					className={cn(
						"fill-mode-forwards delay-[2000] text-black text-[10px] w-1/12 h-[200%] bg-yellow-100 right-1/2 translate-x-1/2 absolute rounded-full z-20",
						pop && "animate-pop",
					)}
				>
					{result}
				</div>

				<div
					className="w-full relative  h-1/2 bg-orange-700 z-30"
					style={{
						clipPath: "polygon(0% 0%, 100% 0%, 75% 100%, 25% 100%)",
					}}
				>
					<div className=" absolute right-1/2 translate-x-1/2 -top-0.5 z-40 aspect-[2/1]  h-[30%] rounded-b-full bg-black" />
				</div>
			</div>
		</div>
	);
};
