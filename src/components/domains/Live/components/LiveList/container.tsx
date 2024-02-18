import { useLiveList } from "./hooks";
import { LiveListPresentation } from "./presentations";
import { LiveListEmptyPresentation } from "./presentations/empty";
export const LiveListContainer = () => {
	const { lives, isEmpty } = useLiveList();
	if (isEmpty) {
		return <LiveListEmptyPresentation />;
	}
	return <LiveListPresentation lives={lives} />;
};
