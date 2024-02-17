import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ChangeEvent } from "react";
type Props = {
	handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
	handleSubmit: () => void;
	error: string;
};
export const LoginFormPresentation = ({
	handleChange,
	handleSubmit,
	error,
}: Props) => (
	<Card>
		<CardHeader>
			<CardTitle>SIGN IN</CardTitle>
		</CardHeader>
		<CardContent>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					handleSubmit();
				}}
				className="flex flex-col gap-4"
			>
				<Input
					placeholder="email"
					name={"email"}
					type="email"
					onChange={handleChange}
				/>
				<Input
					placeholder="password"
					name="password"
					type="password"
					onChange={handleChange}
				/>
				<p className="h-4 w-full">{error}</p>
				<Button className="font-bold">SIGN IN!</Button>
			</form>
		</CardContent>
	</Card>
);
