import { Loader2 } from "lucide-react";

export const CommentTimelineLoadingPresentation = () => {
	return (
		<div className="flex w-full h-full justify-center items-center">
			<Loader2 className=" animate-spin" />
		</div>
	);
};
