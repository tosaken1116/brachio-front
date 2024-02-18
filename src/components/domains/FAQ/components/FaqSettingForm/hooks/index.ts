import { useNavigate } from "@tanstack/react-router";
import { ChangeEvent, useState } from "react";

type IUseFaqSettingForm = {
	handleSubmit: () => void;
	handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
};
type CreateAccountRequest = {
	subDomain: string;
	name: string;
	email: string;
	firebaseId: string;
	projectId: string;
	url: string;
};
export const useFaqSettingForm = (): IUseFaqSettingForm => {
	const [input, setInput] = useState<CreateAccountRequest>({
		subDomain: "",
		name: "",
		email: "",
		firebaseId: localStorage.getItem("uid") ?? "",
		projectId: "",
		url: "",
	});
	const navigate = useNavigate({ from: "/" });

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setInput({ ...input, [e.target.name]: e.target.value });
	};
	const handleSubmit = async () => {
		try {
			const res = await fetch(
				`${import.meta.env.VITE_FAQ_BACKEND_URL}/account`,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: localStorage.getItem("google-token") ?? "",
					},
					method: "POST",
					body: JSON.stringify(input),
				},
			);
			const data = await res.json();
			if (data.status === 201) {
				navigate({ to: "/" });
			}
		} catch (e) {
			// biome-ignore lint/complexity/noUselessCatch: <explanation>
			throw e;
		}
	};
	return { handleChange, handleSubmit };
};
