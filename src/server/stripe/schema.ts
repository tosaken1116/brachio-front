import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { MAX_AMOUNT, MIN_AMOUNT } from "./const";

export const schema = {
	createPayment: zValidator(
		"json",
		z.object({
			amount: z.number().max(MAX_AMOUNT).min(MIN_AMOUNT),
		}),
	),
};

export type CreatePaymentResponse = {
	clientSecret: string;
	publishableKey: string;
};
