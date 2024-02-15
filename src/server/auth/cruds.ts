import { D1ExecResult } from "@cloudflare/workers-types";
import { eq } from "drizzle-orm";
import { BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import { uuid } from "drizzle-orm/pg-core";
import { Context } from "hono";
import { Bindings } from "hono/types";
import { v4 as uuidv4 } from "uuid";
import { users } from "../../scripts/schema";
import { CreateUserInput, CreateUserInputType, FunctionResult } from "./model";
import { AuthBinding } from "./router";

type CreateUserArg = {
	user: {
		email: string;
		name: string;
		password_hash: string;
	};
	db: BetterSQLite3Database;
};
export const createUser = async ({
	user,
	db,
}: CreateUserArg): Promise<FunctionResult<null>> => {
	try {
		const newUser = {
			id: uuidv4(),
			...user,
		};
		await db.insert(users).values(newUser).execute();
		return { data: null, error: null, status: 201 };
	} catch (e) {
		if (e instanceof Error) {
			return { data: null, error: e.message, status: 400 };
		}
		return { data: null, error: "internal server error", status: 500 };
	}
};

type LoginUserArg = {
	user: {
		email: string;
		password: string;
	};
	db: BetterSQLite3Database;
};

export const getUser = async ({
	db,
	user,
}: LoginUserArg): Promise<
	FunctionResult<{
		name: string;
		email: string;
		id: string;
		password_hash: string;
	}>
> => {
	try {
		const result = await db
			.select()
			.from(users)
			.where(eq(users.email, user.email))
			.get();
		if (result === undefined) {
			return { data: null, error: "User not found", status: 404 };
		}
		return { data: result, error: null, status: 200 };
	} catch (e) {
		if (e instanceof Error) {
			return { data: null, error: e.message, status: 400 };
		}
		return { data: null, error: "internal server error", status: 500 };
	}
};
