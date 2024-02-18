import { Elements } from "@stripe/react-stripe-js";
import { PaymentElement } from "@stripe/react-stripe-js";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { FormEvent, Suspense } from "react";
import useSWR from "swr";
import { LoadingDot } from "../icon/LoadingDot";
import { Button } from "../ui/button";
import { Dialog } from "../ui/dialog";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const fetcher = (url: string, amount: number) =>
	fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: localStorage.getItem("temple-token") ?? "",
		},
		body: JSON.stringify({
			amount,
		}),
	}).then((res) => res.json());

export const PaymentForm = ({
	amount = 5000,
	redirectUrl,
	paymentExit,
}: {
	amount?: number;
	redirectUrl?: string | null;
	paymentExit?: () => void;
}) => {
	return (
		<Suspense
			fallback={
				<span>
					<p>支払い中</p>
					<LoadingDot />
				</span>
			}
		>
			<PaymentFormContainer
				amount={amount}
				redirectUrl={redirectUrl}
				paymentExit={paymentExit}
			/>
		</Suspense>
	);
};
export const PaymentFormContainer = ({
	amount = 5000,
	redirectUrl,
	paymentExit,
}: {
	amount?: number;
	redirectUrl?: string | null;
	paymentExit?: () => void;
}) => {
	const url = new URL(window.location.href);
	const redirect = redirectUrl ?? url.href;
	const { data } = useSWR(
		"stripe-key",
		() =>
			fetcher(
				`${import.meta.env.VITE_BACKEND_URL}/api/balance/create-payment-intent`,
				amount,
			),
		{ suspense: true },
	);
	const options = {
		clientSecret: data.clientSecret,
	};
	if (data.automaticPayment && redirectUrl !== null) {
		if (window.location.href === redirect) {
			paymentExit?.();
			return;
		}
		window.location.href = redirect;
	}
	return (
		<Elements stripe={stripePromise} options={options}>
			<Dialog open={true}>
				<CheckoutForm redirectUrl={redirect} paymentExit={paymentExit} />
			</Dialog>
		</Elements>
	);
};

const CheckoutForm = ({
	redirectUrl,
	paymentExit,
}: {
	redirectUrl: string;
	paymentExit?: () => void;
}) => {
	const stripe = useStripe();
	const elements = useElements();

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();

		if (!stripe || !elements) {
			return;
		}

		const result = await stripe.confirmPayment({
			elements,
			confirmParams: {
				return_url: redirectUrl,
			},
		});
		if (result.error) {
			console.log(result.error.message);
		} else {
			paymentExit?.();
		}
	};
	return (
		<form onSubmit={(e) => handleSubmit(e)}>
			<PaymentElement />
			<Button>Submit</Button>
		</form>
	);
};

export default CheckoutForm;
