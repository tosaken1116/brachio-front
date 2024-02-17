import { LoadingDot } from "@/components/icon/LoadingDot";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export const FAQFormLoadingPresentation = () => {
	return (
		<span className="flex flex-row items-center gap-4 delay-500">
			<Avatar className="rounded-full">
				<AvatarImage src="/bot.webp" />
			</Avatar>
			<p className="rounded-full bg-green-400 text-black">
				<LoadingDot />
			</p>
		</span>
	);
};
