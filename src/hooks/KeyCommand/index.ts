import { useEffect, useState } from "react";

export const useKeyCommand = (keys: string[], callback: () => void) => {
	const [keyStack, setKeyStack] = useState<string[]>([]);
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			setKeyStack([...keyStack, e.key]);
			if (keys.length < keyStack.length) {
				return;
			}
			const check = [...keyStack, e.key].every((key, i) => key === keys[i]);
			if (!check) {
				setKeyStack([]);
				return;
			}
			if (keyStack.length === keys.length - 1) {
				callback();
				setKeyStack([]);
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [keys, callback]);
};
