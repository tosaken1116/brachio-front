import { LiveList } from "@/components/domains/Live/components/LiveList";
import { DrawOmikuji } from "@/components/domains/Omikuji/components/DrawOmikuji";
import { Button } from "@/components/ui/button";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { X } from "lucide-react";

export const AllLive = () => {
	return (
		<div>
			<LiveList />
			<Drawer>
				<DrawerTrigger>
					<Button className="text-xl absolute right-0 bottom-0">
						おみくじを引く
					</Button>
				</DrawerTrigger>
				<DrawerContent className="w-full h-screen flex justify-center items-center">
					<DrawerClose className="right-0 top-0 absolute">
						<X className=" w-24 h-24" />
					</DrawerClose>
					<div>
						<DrawOmikuji />
					</div>
				</DrawerContent>
			</Drawer>
		</div>
	);
};
