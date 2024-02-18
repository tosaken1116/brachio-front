import { useNavigate } from "@tanstack/react-router";
import { ChangeEvent, useState } from "react";
type IUseSignUpForm = {
	handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
	handleSubmit: () => void;
	error: string;
};
export type SignUpForm = {
	email: string;
	password: string;
	name: string;
};
export const useSignUpForm = (): IUseSignUpForm => {
	const [input, setInput] = useState<SignUpForm>({
		email: "",
		password: "",
		name: "",
	});
	const navigate = useNavigate({ from: "/auth" });

	const [error, setError] = useState<string>("");
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setInput({
			...input,
			[e.target.name]: e.target.value,
		});
	};
	const handleSubmit = async () => {
		if (input.email === "" || input.password === "") {
			return;
		}
		try {
			const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/signup`, {
				method: "POST",
				body: JSON.stringify(input),
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (res.ok) {
				const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/signin`, {
					method: "POST",
					body: JSON.stringify({
						email: input.email,
						password: input.password,
					}),
					headers: {
						"Content-Type": "application/json",
					},
				});
				const data = await res.json();
				if (res.status === 200) {
					localStorage.setItem("temple-token", data.jwt);
					navigate({ to: "/" });
				}
			}
		} catch (e) {
			console.error(e);
			setError("Invalid email or password");
		}
	};
	return { handleChange, handleSubmit, error };
};
