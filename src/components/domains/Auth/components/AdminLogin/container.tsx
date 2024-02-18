import { useAdminLogin } from "./hooks";
import { AdminLoginPresentation } from "./presentations";
export const AdminLoginContainer = () => {
	const { login } = useAdminLogin();
	return <AdminLoginPresentation login={login} />;
};
