import { FAQForm } from "@/components/domains/FAQ/components/FAQForm";
import { FaqQuestionList } from "@/components/domains/FAQ/components/FaqQuestionList";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { useKeyCommand } from "@/hooks/KeyCommand";

export const Root = () => {
	useKeyCommand(
		[
			"ArrowUp",
			"ArrowUp",
			"ArrowDown",
			"ArrowDown",
			"ArrowLeft",
			"ArrowRight",
			"ArrowLeft",
			"ArrowRight",
			"b",
			"a",
		],
		() => {
			window.location.replace("/lives");
		},
	);

	return (
		<div className="w-full h-screen flex justify-center items-center">
			<Drawer>
				<DrawerTrigger className="absolute right-0 bottom-0" asChild>
					<Button className="font-bold p-8">
						AIチャットに聞いてみませんか？
					</Button>
				</DrawerTrigger>
				<DrawerContent>
					<FAQForm />
				</DrawerContent>
			</Drawer>
			<div className="h-2/3 max-h-96 overflow-scroll">
				<FaqQuestionList />
			</div>
		</div>
	);
};
