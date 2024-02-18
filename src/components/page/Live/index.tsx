import { Comment } from "@/components/domains/Live/components/Comment";
import { Button } from "@/components/ui/button";
import Hls from "hls.js";
import { LogInIcon } from "lucide-react";
import { FC, useEffect, useMemo, useRef } from "react";
import TRTC from "trtc-sdk-v5";
import { getUserSigniture } from "../../../libs/getUserSigniture";

export const Live: FC = () => {
	const trtc = TRTC.create();
	const sdkAppId = Number(import.meta.env.VITE_TRTC_SDK_APP_ID);

	const myId = crypto.randomUUID().replace(/-/g, "_");
	const handleClickParticipant = () => {
		const d = async () => {
			const userSig = await getUserSigniture(myId);
			trtc.enterRoom({
				strRoomId: "hoge",
				scene: TRTC.TYPE.SCENE_LIVE,
				sdkAppId,
				userId: myId,
				userSig,
				role: TRTC.TYPE.ROLE_ANCHOR,
			});
			//   trtc.switchRole(TRTC.TYPE.ROLE_ANCHOR);
			const view = "local-video";
			await trtc.startLocalVideo({ view });
			await trtc.startLocalAudio();
			//   const d = await fetch(
			//     "https://tencentcloud-api-server-5uovba7yfa-an.a.run.app/mixStreaming"
			//   );
			//   console.log(d);
		};
		d();
	};

	//   const handleClickAudience = async () => {
	//     const userSig = await getUserSigniture(myId);

	//     trtc.enterRoom({
	//       strRoomId: "hoge",
	//       userSig,
	//       scene: TRTC.TYPE.SCENE_LIVE,
	//       sdkAppId,
	//       userId: myId,

	//       role: TRTC.TYPE.ROLE_ANCHOR,
	//     });

	//     trtc.on(TRTC.EVENT.REMOTE_VIDEO_AVAILABLE, ({ userId, streamType }) => {
	//       const view = `${userId}_${streamType}`;
	//       const div = document.createElement("div");
	//       div.id = `${userId}_${streamType}`;

	//       div.innerHTML = "";

	//       document.body.appendChild(div);
	//       document.styleSheets[0].insertRule(
	//         `#${userId}_${streamType} { display: none; }`
	//       );
	//       console.error(view);

	//       trtc.startRemoteVideo({
	//         userId,
	//         streamType,
	//         view,
	//       });
	//     });
	//   };
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	//   useEffect(() => {
	//     handleClickAudience();
	//   }, []);
	return (
		<div>
			<div id="local-video" style={{ display: "none" }} />
			<div id="hoge" />
			<div className="flex flex-row gap-4">
				<Player src={`${import.meta.env.VITE_HLS_URL}`} />
				<div className="flex flex-col gap-2">
					<Comment />
					<Button type="button" onClick={() => handleClickParticipant()}>
						<span className="flex flex-row items-center gap-4 font-bold">
							<LogInIcon />
							配信に参加する
						</span>
					</Button>
				</div>
			</div>
		</div>
	);
};

interface Props {
	src: string;
}

const Player: FC<Props> = ({ src }) => {
	const isSupportBrowser = useMemo(() => Hls.isSupported(), []);
	const videoRef = useRef(null);
	useEffect(() => {
		if (isSupportBrowser) {
			const hls = new Hls();
			hls.loadSource(src);
			if (videoRef?.current) {
				hls.attachMedia(videoRef?.current);
			}
			return () => {
				hls.removeAllListeners();
				hls.stopLoad();
			};
		}
	}, [src, isSupportBrowser]);
	return (
		<>
			<div>
				{isSupportBrowser ? (
					<div>
						<video
							ref={videoRef}
							controls
							style={{ width: "80vw", aspectRatio: "16/9" }}
						/>
						{/* <track kind="captions" /> */}
						{/* </video> */}
					</div>
				) : (
					<div>お使いのブラウザでは動画再生をサポートしていません。</div>
				)}
			</div>
		</>
	);
};
