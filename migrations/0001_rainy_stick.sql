CREATE TABLE `omikuji` (
	`id` text PRIMARY KEY NOT NULL,
	`grade` text NOT NULL,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP,
	`updated_at` integer DEFAULT CURRENT_TIMESTAMP
);