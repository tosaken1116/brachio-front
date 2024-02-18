import { loginWithGoogle } from "@/libs/firebase";
import { useNavigate } from "@tanstack/react-router";

type IUseAdminLogin = {
	login: () => void;
};

export const useAdminLogin = (): IUseAdminLogin => {
	const navigate = useNavigate({ from: "/" });

	const login = () => loginWithGoogle(() => navigate({ to: "/" }));
	return { login };
};
