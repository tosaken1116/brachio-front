import { useFAQForm } from "./hooks";
import { FAQFormPresentation } from "./presentations";

export const FAQFormContainer = () => {
	const { chat, chats, isEmpty, isLoading, handleChange, handleTalkSubmit } =
		useFAQForm();

	return (
		<FAQFormPresentation
			isEmpty={isEmpty}
			isLoading={isLoading}
			chat={chat}
			chats={chats}
			handleChange={handleChange}
			handleTalkSubmit={handleTalkSubmit}
		/>
	);
};
