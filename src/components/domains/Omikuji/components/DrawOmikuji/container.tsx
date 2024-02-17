import { useDrawOmikuji } from "./hooks";
import { DrawOmikujiPresentation } from "./presentations";
export const DrawOmikujiContainer = () => {
	const { isLoaded, handleOmikuji, result, isDraw } = useDrawOmikuji();
	if (isDraw) {
		return <p>今日のおみくじは終了しました</p>;
	}
	return (
		<DrawOmikujiPresentation
			isLoaded={isLoaded}
			handleOmikuji={handleOmikuji}
			result={result}
		/>
	);
};
