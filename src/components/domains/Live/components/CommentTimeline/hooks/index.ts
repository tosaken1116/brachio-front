type IUseCommentTimeline = {
	comments: Comment[];
	isEmpty: boolean;
};

export type Comment = {
	userName: string;
	price: number;
	comment: string;
	timestamp: string;
};

export const useCommentTimeline = (): IUseCommentTimeline => {
	const comments = [
		{
			userName: "user1",
			price: 100,
			comment:
				"comment1aaaaaaaaaacomment1aaaaaaaaaacomment1aaaaaaaaaacomment1aaaaaaaaaa",
			timestamp: "2021-09-01 01:00:00",
		},
		{
			userName: "user2",
			price: 200,
			comment: "comment2",
			timestamp: "2021-09-01 00:00:00",
		},
	];
	const isEmpty = comments.length === 0;
	return { comments, isEmpty };
};
