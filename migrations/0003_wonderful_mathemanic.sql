CREATE TABLE `balance_transaction` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` text NOT NULL,
	`type` text,
	`amount` integer,
	`timestamp` integer DEFAULT CURRENT_TIMESTAMP
);
