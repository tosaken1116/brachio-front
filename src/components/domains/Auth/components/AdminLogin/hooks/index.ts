import { loginWithGoogle } from "@/libs/firebase";

type IUseAdminLogin = {
	login: () => void;
};

export const useAdminLogin = (): IUseAdminLogin => {
	const login = loginWithGoogle;
	return { login };
};
