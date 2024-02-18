import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { BadgeCentIcon, Radio } from "lucide-react";
import { Link } from "react-router-dom";
import { Live } from "../hooks";
type Props = {
	lives: Live[];
};
export const LiveListPresentation = ({ lives }: Props) => (
	<div className="flex gap-4 flex-wrap">
		{lives.map((live) => (
			<div key={live.id}>
				<Item {...live} />
			</div>
		))}
	</div>
);

const Item = (live: Live) => {
	return (
		<Link to={`/live/${live.id}`}>
			<Card className="w-fit h-fit rounded-3xl">
				<CardContent className="pt-6">
					<div>
						<img
							src={live.thumbnail}
							alt={live.title}
							className=" object-cover w-64  aspect-video rounded-md"
						/>
					</div>
				</CardContent>
				<CardFooter className="flex flex-col items-start gap-3">
					<strong>{live.title}</strong>
					{live.isMemberShip ? (
						<span className="flex flex-row h-4 text-blue-500">
							<BadgeCentIcon />
							<p>メンバーシップ限定</p>
						</span>
					) : (
						<span className="h-4" />
					)}
					{live.isLive ? (
						<span className="flex flex-row h-6 p-1 rounded-sm bg-red-500 text-white">
							<Radio className="w-4 h-4" />
							<caption className="text-xs">ライブ中</caption>
						</span>
					) : (
						<span className="h-6" />
					)}
				</CardFooter>
			</Card>
		</Link>
	);
};
