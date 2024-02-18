import { DrawOmikuji } from "@/components/domains/Omikuji/components/DrawOmikuji";

export const Root = () => {
	return (
		<div className="w-full h-screen flex justify-center items-center">
			<DrawOmikuji />
		</div>
	);
};
