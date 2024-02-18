import { Comment } from "@/components/domains/Live/components/Comment";
import { CommentTimeline } from "@/components/domains/Live/components/CommentTimeline";

export const Root = () => {
	return (
		<>
			<CommentTimeline />
			<Comment />
		</>
	);
};
