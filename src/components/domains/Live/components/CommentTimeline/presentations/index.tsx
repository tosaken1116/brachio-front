import { List } from "@/components/ui/List";
import Avatar from "boring-avatars";
import { Comment } from "../hooks";

export const CommentTimelinePresentation = ({
	comments,
}: {
	comments: Comment[];
}) => (
	<List className="gap-4">
		{comments.map((comment) => (
			<Item {...comment} />
		))}
	</List>
);

const Item = (comment: Comment) => {
	return (
		<div className="flex flex-row gap-2">
			<span>
				<Avatar
					size={36}
					name={comment.userName}
					variant="beam"
					colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
				/>
			</span>
			<p className="font-bold">{comment.userName}</p>

			<p className="flex-grow break-all items-start">{comment.comment}</p>
			<time>
				{((): string => {
					const date = new Date(comment.timestamp);
					return `${`0${date.getHours()}`.slice(
						-2,
					)}:${`0${date.getMinutes()}`.slice(-2)}`;
				})()}
			</time>
		</div>
	);
};
