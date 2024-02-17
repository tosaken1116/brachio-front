type Props = {
	handleClickAudience: () => void;
	handleClickParticipant: () => void;
};
export const LiveViewPresentation = ({
	handleClickAudience,
	handleClickParticipant,
}: Props) => {
	return (
		<div>
			<h1>hey</h1>
			<button onClick={handleClickAudience} type="button">
				Audience
			</button>
			<button onClick={handleClickParticipant} type="button">
				Participant
			</button>
			<div id="local-video" />
			<div id="hoge" />
		</div>
	);
};
