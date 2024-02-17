import { useLoginForm } from "./hooks";
import { LoginFormPresentation } from "./presentations";
export const LoginFormContainer = () => {
	const { handleChange, handleSubmit, error } = useLoginForm();
	return (
		<LoginFormPresentation
			handleChange={handleChange}
			handleSubmit={handleSubmit}
			error={error}
		/>
	);
};
