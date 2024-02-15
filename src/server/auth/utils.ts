import { encode } from "punycode";
import bcrypt, { encodeBase64 } from "bcryptjs";
export const hashPassword = async (password: string) => {
	return await bcrypt.hash(password, 10);
};

export const checkPassword = async (
	password: string,
	hashedPassword: string,
) => {
	return await bcrypt.compare(password, hashedPassword);
};

const encodeJwtPart = (part: unknown) => {
	const utf8Encoder = new TextEncoder();
	const buf = utf8Encoder.encode(JSON.stringify(part));
	return encodeBase64(buf, buf.length);
};
export const sign = async (payload: unknown, secret: string, alg = "HS256") => {
	const encodedPayload = encodeJwtPart(payload).replace(/=/g, "");
	const encodedHeader = encodeJwtPart({ alg, typ: "JWT" }).replace(/=/g, "");
	const partialToken = `${encodedHeader}.${encodedPayload}`;
	if (!crypto.subtle || !crypto.subtle.importKey) {
		throw new Error(
			"`crypto.subtle.importKey` is undefined. JWT auth middleware requires it.",
		);
	}
	const utf8Encoder2 = new TextEncoder();
	const param = { name: "HMAC", hash: { name: "SHA-256" } };
	const cryptoKey = await crypto.subtle.importKey(
		"raw" /* RAW */,
		utf8Encoder2.encode(secret),
		param,
		false,
		["sign" /* Sign */],
	);
	const signaturePart = await crypto.subtle.sign(
		param,
		cryptoKey,
		utf8Encoder2.encode(partialToken),
	);

	const signnature = encodeJwtPart(signaturePart)
		.replace(/\/|\+/g, (m) => ({ "/": "_", "+": "-" })[m] ?? m)
		.replace(/=/g, "");

	return `${partialToken}.${signnature}`;
};
