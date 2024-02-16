import { Hono } from "hono";
import Stripe from "stripe";
import { CreatePaymentResponse, schema } from "./schema";
import { CreatePaymentIntent, MakeDeposit } from "./usecase";

const app = new Hono();

// Create PaymentIntent
const post = app.post("/charge", schema.createPayment, async (c) => {
	const { amount } = c.req.valid("json");

	const response = await CreatePaymentIntent(c, {
		userId: c.var.userId,
		amount: amount,
	});

	return c.json(response);
});

// Webhook
app.post("/webhook", async (c) => {
	const signature = c.req.header("stripe-signature");
	if (!signature) {
		return c.json({ message: "Invalid signature" }, 400);
	}

	const stripe = new Stripe(c.env.STRIPE_SECRET_KEY);
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
			await MakeDeposit(c, {
				userId: "hoge",
				amount: event.data.object.amount,
			});
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
