import { Elements } from "@stripe/react-stripe-js";
import { PaymentElement } from "@stripe/react-stripe-js";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { FormEvent } from "react";
import useSWR from "swr";
import { Button } from "../ui/button";

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
export const PaymentForm = () => {
	const url = new URL(window.location.href);
	const amount = parseInt(url.searchParams.get("amount") ?? "5000") ?? 5000;
	const { data } = useSWR(
		"stripe-key",
		() =>
			fetcher(
				`${import.meta.env.VITE_BACKEND_URL}/api/balance/create-payment-intent`,
				amount,
			),
		{ suspense: true },
	);
	const redirectUrl =
		url.searchParams.getAll("redirect_url")[0] ??
		(import.meta.env.DEV
			? "http://localhost:5173"
			: `${url.protocol}//${url.hostname}`);
	const options = {
		clientSecret: data.clientSecret,
	};
	if (data.automaticPayment) {
		window.location.href = redirectUrl;
	}
	return (
		<Elements stripe={stripePromise} options={options}>
			<CheckoutForm redirectUrl={redirectUrl} />
		</Elements>
	);
};

const CheckoutForm = ({ redirectUrl }: { redirectUrl: string }) => {
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
