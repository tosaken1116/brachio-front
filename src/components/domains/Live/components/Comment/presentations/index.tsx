import { PaymentForm } from "@/components/functional/Payment";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/libs/cx";
import { DollarSignIcon, Send, X } from "lucide-react";
import { ChangeEvent } from "react";
import { CommentTimeline } from "../../CommentTimeline";

type Props = {
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
export const prices = [
	0, 200, 500, 1000, 2000, 5000, 10000, 20000, 30000, 40000, 50000,
];
const colors = [
	"bg-gray-700",
	"bg-[#1F69C2]",
	"bg-[#19BAD5]",
	"bg-[#1CC1A8]",
	"bg-[#FFB519]",
	"bg-[#E65712]",
	"bg-[#C42360]",
	"bg-[#D2140F]",
	"bg-[#D2140F]",
	"bg-[#D2140F]",
	"bg-[#D2140F]",
	"bg-[#D2140F]",
];
const textColors = [
	"text-white",
	"text-black",
	"text-black",
	"text-black",
	"text-white",
	"text-white",
	"text-white",
	"text-white",
	"text-white",
	"text-white",
];
export const CommentPresentation = ({
	handleChange,
	handleSubmit,
	handleSlider,
	priceIndex,
	isSuper,
	abortSuper,
	changeToSuper,
	isCommentInput,
	comment,
	paying,
	paymentExit,
}: Props) => (
	<Card className="max-w-96 relative">
		<CardContent className="h-96">
			<CommentTimeline />
		</CardContent>
		<CardContent className="p-4">
			<form
				className="flex flex-row items-center gap-2"
				onSubmit={(e) => {
					e.preventDefault();
					handleSubmit();
				}}
			>
				<Textarea
					onChange={handleChange}
					value={comment}
					className="bg-transparent rounded-3xl min-h-4"
				/>
				<div className="flex flex-row gap-2">
					{isCommentInput && (
						<Button size="sm" variant="ghost" type="submit">
							<Send />
						</Button>
					)}
					<Button size="sm" variant="ghost" onClick={changeToSuper}>
						<DollarSignIcon />
					</Button>
				</div>

				{isSuper && (
					<Card className="absolute left-0 bottom-0 w-full h-full">
						<div className="flex justify-end">
							<Button
								variant={"ghost"}
								onClick={abortSuper}
								className="self-end"
							>
								<X />
							</Button>
						</div>
						<CardContent className="h-full flex flex-col gap-8">
							<Card className={cn(colors[priceIndex], textColors[priceIndex])}>
								<CardHeader>
									<p>￥{prices[priceIndex]}</p>
								</CardHeader>
								<CardContent>
									<Textarea
										value={comment}
										className={"bg-black/20 rounded-xl border-none min-h-4"}
										onChange={handleChange}
									/>
								</CardContent>
							</Card>
							{paying && (
								<PaymentForm
									amount={prices[priceIndex]}
									paymentExit={paymentExit}
								/>
							)}

							<p className="text-center">{prices[priceIndex]}JPY</p>
							<Slider
								value={[priceIndex]}
								onValueChange={handleSlider}
								max={10}
								min={0}
								step={1}
							/>
							<Button>送信</Button>
						</CardContent>
					</Card>
				)}
			</form>
		</CardContent>
	</Card>
);
