import { ResolveConfigFn, instrument } from "@microlabs/otel-cf-workers";
import { Hono } from "hono";

export interface Env {
	HONEYCOMB_API_KEY: string;
	OTEL_TEST: KVNamespace;
}

export const config: ResolveConfigFn = (env: Env, _trigger) => {
	return {
		exporter: {
			url: "https://api.honeycomb.io/v1/traces",
			headers: { "x-honeycomb-team": "T7g7ea27Ny0ZAKrVSSZWeP" },
		},
		service: { name: "carcharhinus" },
	};
};
