import Hls from "hls.js";
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
			const view = "local-video";
			await trtc.startLocalVideo({ view });
			await trtc.startLocalAudio();
		};
		d();
	};

	const handleClickAudience = async () => {
		const userSig = await getUserSigniture(myId);

		trtc.enterRoom({
			strRoomId: "hoge",
			userSig,
			scene: TRTC.TYPE.SCENE_LIVE,
			sdkAppId,
			userId: myId,

			role: TRTC.TYPE.ROLE_AUDIENCE,
		});

		trtc.on(TRTC.EVENT.REMOTE_VIDEO_AVAILABLE, ({ userId, streamType }) => {
			const view = `${userId}_${streamType}`;
			const div = document.createElement("div");
			div.id = `${userId}_${streamType}`;

			div.innerHTML = "ビデオだよ";

			document.body.appendChild(div);
			console.error(view);

			trtc.startRemoteVideo({
				userId,
				streamType,
				view,
			});
		});
	};

	return (
		<div>
			<h1>hey</h1>
			<button type="button" onClick={() => handleClickAudience()}>
				配信を見る
			</button>
			<button type="button" onClick={() => handleClickParticipant()}>
				配信を行う
			</button>
			<div id="local-video" />
			<div id="hoge" />
			<Player src={`${import.meta.env.VITE_HLS_URL}`} />
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
						>
							<track kind="captions" />
						</video>
					</div>
				) : (
					<div>お使いのブラウザでは動画再生をサポートしていません。</div>
				)}
			</div>
		</>
	);
};
