import { Hono } from "hono";
import Stripe from "stripe";
import { CreatePaymentResponse, schema } from "./schema";

type Bindings = {
	STRIPE_PUBLISHABLE_KEY: string;
	STRIPE_SECRET_KEY: string;
	STRIPE_WEBHOOK_SECRET: string;
};

type Variables = {
	stripe: Stripe;
};

const app = new Hono<{
	Bindings: Bindings;
	Variables: Variables;
}>();

app.use((c, next) => {
	const stripe = new Stripe(c.env.STRIPE_SECRET_KEY);
	c.set("stripe", stripe);
	return next();
});

// Create PaymentIntent
const post = app.post("/", schema.createPayment, async (c) => {
	const { amount } = c.req.valid("json");

	const stripe = c.get("stripe");
	// const stripe = new Stripe(c.env.STRIPE_SECRET_KEY);
	let paymentIntent: Stripe.Response<Stripe.PaymentIntent>;

	// Create PaymentIntent
	try {
		paymentIntent = await stripe.paymentIntents.create({
			amount: amount,
			currency: "jpy",
		});
	} catch (error) {
		console.error(error);
		return c.json({ message: "Internal Server Error" }, 500);
	}

	const response: CreatePaymentResponse = {
		clientSecret: paymentIntent.client_secret ?? "",
		publishableKey: c.env.STRIPE_PUBLISHABLE_KEY,
	};

	return c.json(response);
});

// Webhook
app.post("/webhook", async (c) => {
	const signature = c.req.header("stripe-signature");
	if (!signature) {
		return c.json({ message: "Invalid signature" }, 400);
	}

	const stripe = c.get("stripe");
	let event: Stripe.Event;
	try {
		const body = await c.req.text();
		event = await stripe.webhooks.constructEventAsync(
			body,
			signature,
			c.env.STRIPE_WEBHOOK_SECRET,
		);
	} catch (error) {
		console.error(error);
		return c.json({ message: "Webhook Error" }, 400);
	}

	switch (event.type) {
		case "payment_intent.succeeded":
			console.log("💰 PaymentIntent was successful!");
			// Then define and call a function to handle the event payment_intent.succeeded
			break;
		case "payment_intent.created":
			console.log("PaymentIntent was created");
			break;
		default:
			console.log(`Unhandled event type ${event.type}`);
	}

	return c.json(null, 200);
});

// RPC
export type CreatePayment = typeof post;

export default app;
