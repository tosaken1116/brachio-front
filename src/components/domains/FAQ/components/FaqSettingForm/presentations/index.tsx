import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ChangeEvent } from "react";

type Props = {
	handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
	handleSubmit: () => void;
};
export const FaqSettingFormPresentation = ({
	handleChange,
	handleSubmit,
}: Props) => (
	<form
		onSubmit={(e) => {
			e.preventDefault();
			handleSubmit();
		}}
	>
		<Card>
			<CardHeader>
				<CardTitle>Setting</CardTitle>
			</CardHeader>
			<CardContent>
				<Input
					onChange={handleChange}
					name="subDomain"
					placeholder="subDomain"
				/>
				<Input onChange={handleChange} name="name" placeholder="name" />
				<Input onChange={handleChange} name="email" placeholder="email" />
				<Input
					onChange={handleChange}
					name="projectId"
					placeholder="projectId"
				/>
				<Input onChange={handleChange} name="url" placeholder="url" />
			</CardContent>
		</Card>
		<Button type="submit">送信</Button>
	</form>
);
