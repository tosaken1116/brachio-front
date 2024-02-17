import TRTC from "trtc-sdk-v5";

type IUseLiveView = {
	isEmpty: boolean;
	handleClickAudience: () => void;
	handleClickParticipant: () => void;
};
const noop = () => {};
export const useLiveView = (): IUseLiveView => {
	if (typeof document !== "undefined") {
		const trtc = TRTC.create();
		const sdkAppId = 0;
		const userId = "";
		const userSig = "";

		const handleClickParticipant = () => {
			const d = async () => {
				trtc.enterRoom({
					strRoomId: "hoge",
					scene: TRTC.TYPE.SCENE_LIVE,
					sdkAppId,
					userId,
					userSig,
					role: TRTC.TYPE.ROLE_ANCHOR,
				});
				const view = "local-video";
				await trtc.startLocalVideo({ view });
				await trtc.startLocalAudio();
			};
			d();
		};
		const handleClickAudience = () => {
			trtc.enterRoom({
				strRoomId: "hoge",

				scene: TRTC.TYPE.SCENE_LIVE,
				sdkAppId,
				userId: "fff",
				userSig:
					"eJyrVgrxCdYrSy1SslIy0jNQ0gHzM1NS80oy0zLBwmlpaVDh4pTsxIKCzBQlKyMDAwNzQxNTiHhqRUFmUaqSlaGpqSlIBiJakpkLEjM3sDAwNjOxNIOakZkONDM-LNs1KbW0sNgoINxR28m10tLELMPDMjLVx9s8Mz8yP8cy2yc9OdwkstDRVqkWAFM4MBg_",
				role: TRTC.TYPE.ROLE_AUDIENCE,
			});

			trtc.on(
				TRTC.EVENT.REMOTE_VIDEO_AVAILABLE,
				({ userId, streamType }: { userId: string; streamType: number }) => {
					const view = `${userId}_${streamType}`;
					const div = document.createElement("div");
					div.id = `${userId}_${streamType}`;

					div.innerHTML = "ここにコンテンツを追加";

					document.body.appendChild(div);
					console.error(view);

					trtc.startRemoteVideo({ userId, streamType, view });
				},
			);
		};
	}
	const isEmpty = false;
	return { handleClickAudience: noop, handleClickParticipant: noop, isEmpty };
};
