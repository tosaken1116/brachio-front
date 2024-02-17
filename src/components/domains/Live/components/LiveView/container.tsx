import { useLiveView } from "./hooks";
import { LiveViewPresentation } from "./presentations";
import { LiveViewEmptyPresentation } from "./presentations/empty";
export const LiveViewContainer = () => {
	const { isEmpty, handleClickAudience, handleClickParticipant } =
		useLiveView();
	if (isEmpty) {
		return <LiveViewEmptyPresentation />;
	}
	return (
		<LiveViewPresentation
			handleClickAudience={handleClickAudience}
			handleClickParticipant={handleClickParticipant}
		/>
	);
};
