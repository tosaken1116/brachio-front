import { useEffect, useRef, useState } from "react";
import ReconnectingWebSocket from "reconnecting-websocket";

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
	const socketRef = useRef<ReconnectingWebSocket>();
	const [comments, setComments] = useState<Comment[]>([]);
	let websocket: ReconnectingWebSocket;
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const onMessage = (event: MessageEvent<string>) => {
			const data: Comment = JSON.parse(event.data);
			setComments((prev) => [...prev, data]);
		};
		fetch(`https://${import.meta.env.VITE_WS_URL}/ott`, {
			headers: {
				Authorization: localStorage.getItem("temple-token") ?? "",
			},
		}).then((res) => {
			res.json().then((data) => {
				console.log(data);
				websocket = new ReconnectingWebSocket(
					`wss://${import.meta.env.VITE_WS_URL}?token=${data.token}/ws` ??
						"ws://localhost:80/ws",
				);
				socketRef.current = websocket;

				websocket.addEventListener("message", onMessage);
			});
		});

		return () => {
			if (websocket) {
				websocket.close();
				websocket.removeEventListener("message", onMessage);
			}
		};
	}, []);
	const isEmpty = comments.length === 0;
	return { comments, isEmpty };
};
