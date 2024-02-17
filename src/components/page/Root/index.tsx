import { DrawOmikuji } from "@/components/domains/Omikuji/components/DrawOmikuji";
import {
	DrawOmikujiPresentation,
	OmikujiBox,
} from "@/components/domains/Omikuji/components/DrawOmikuji/presentations";

export const Root = () => {
	return (
		<div className="w-full h-screen flex justify-center items-center">
			<DrawOmikuji />
		</div>
	);
};
