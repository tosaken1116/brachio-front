import { useState } from "react";

type IUseDrawOmikuji = {
	handleOmikuji: () => void;
	isLoaded: boolean;
	result: string;
};

export const useDrawOmikuji = (): IUseDrawOmikuji => {
	const [result, setResult] = useState("");
	const [isLoaded, setIsLoaded] = useState(false);
	// const { data } = useSWR(
	//   "/api/omikuji",
	//   () =>
	//     fetch(`${import.meta.env.VITE_BACKEND_URL}/api/omikuji`, {
	//       headers: {
	//         Authorization: localStorage.getItem("temple-token") ?? "",
	//       },
	//     }).then((res) => res.json()),
	//   { suspense: true }
	// );
	const handleOmikuji = async () => {
		try {
			setIsLoaded(true);
			const res = await fetch(
				`${import.meta.env.VITE_BACKEND_URL}/api/omikuji`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: localStorage.getItem("temple-token") ?? "",
					},
				},
			);
			await new Promise((resolve) => {
				setTimeout(() => {
					resolve(null);
				}, 3000);
			});
			const data = await res.json();
			setResult(data.display);
		} catch (e) {
			await new Promise((resolve) => {
				setTimeout(() => {
					resolve(null);
				}, 3000);
			});

			console.error(e);
		}
	};

	return { handleOmikuji, isLoaded, result };
};
