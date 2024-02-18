import { useComment } from "./hooks";
import { CommentPresentation } from "./presentations";
export const CommentContainer = () => {
	const {
		handleChange,
		handleSubmit,
		handleSlider,
		priceIndex,
		abortSuper,
		changeToSuper,
		isSuper,
		isCommentInput,
		comment,
		paying,
		paymentExit,
	} = useComment();
	return (
		<CommentPresentation
			handleSubmit={handleSubmit}
			handleChange={handleChange}
			handleSlider={handleSlider}
			priceIndex={priceIndex}
			isSuper={isSuper}
			changeToSuper={changeToSuper}
			abortSuper={abortSuper}
			isCommentInput={isCommentInput}
			comment={comment}
			paying={paying}
			paymentExit={paymentExit}
		/>
	);
};
