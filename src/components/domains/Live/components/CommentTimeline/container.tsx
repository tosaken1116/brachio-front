import { useCommentTimeline } from "./hooks";
import { CommentTimelinePresentation } from "./presentations";
import { CommentTimelineEmptyPresentation } from "./presentations/empty";
export const CommentTimelineContainer = () => {
	const { comments, isEmpty } = useCommentTimeline();
	if (isEmpty) {
		return <CommentTimelineEmptyPresentation />;
	}
	return <CommentTimelinePresentation comments={comments} />;
};
