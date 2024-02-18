import { useNavigate } from "@tanstack/react-router";
import { ChangeEvent, useState } from "react";
export type LoginForm = {
	email: string;
	password: string;
};
type IUseLoginForm = {
	handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
	handleSubmit: () => void;
	error: string;
};

export const useLoginForm = (): IUseLoginForm => {
	const [input, setInput] = useState<LoginForm>({
		email: "",
		password: "",
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
			const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/signin`, {
				method: "POST",
				body: JSON.stringify(input),
				headers: {
					"Content-Type": "application/json",
				},
			});
			const data = await res.json();
			if (res.status === 200) {
				localStorage.setItem("temple-token", data.jwt);
				navigate({ to: "/" });
			}
			if (res.status === 400) {
				setError("Invalid email or password");
			}
		} catch (e) {
			console.error(e);
		}
	};
	return { error, handleChange, handleSubmit };
};
