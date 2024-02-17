import { useSignUpForm } from "./hooks";
import { SignUpFormPresentation } from "./presentations";
export const SignUpFormContainer = () => {
	const { handleChange, handleSubmit, error } = useSignUpForm();
	return (
		<SignUpFormPresentation
			handleChange={handleChange}
			handleSubmit={handleSubmit}
			error={error}
		/>
	);
};
