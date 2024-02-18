import { loginWithGoogle } from "@/libs/firebase";
import { useState } from "react";

type IUseAdminLogin = {
	login: () => void;
};

export const useAdminLogin = (): IUseAdminLogin => {
	const login = loginWithGoogle;
	return { login };
};
