import { Card, CardContent, CardFooter } from "@/components/ui/card";

export const LiveListLoadingPresentation = () => {
	return (
		<div className="flex gap-4 flex-wrap">
			{[...Array(10)].map((_) => (
				<Card className="w-fit h-fit rounded-3xl">
					<CardContent className="pt-6">
						<div className="animate-pulse">
							<div className="bg-gray-300 w-64 h-36 rounded-md" />
						</div>
					</CardContent>
					<CardFooter className="flex flex-col items-start gap-3">
						<div className="animate-pulse">
							<div className="bg-gray-300 w-32 h-4 rounded-md" />
						</div>
						<div className="animate-pulse">
							<div className="bg-gray-300 w-32 h-4 rounded-md" />
						</div>
						<div className="animate-pulse">
							<div className="bg-gray-300 w-32 h-6 rounded-md" />
						</div>
					</CardFooter>
				</Card>
			))}
		</div>
	);
};
