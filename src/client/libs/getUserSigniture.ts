export const getUserSigniture = async (id: string): Promise<string> => {
	const response = await fetch(`${import.meta.env.VITE_BASE_URL}/userSig`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ id }),
	});
	const data = await response.json();
	return data.userSig as string;
};
